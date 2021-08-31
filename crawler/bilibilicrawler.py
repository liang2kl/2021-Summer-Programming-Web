from videorecord import VideoRecord, Comment
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from typing import List
from urllib.request import urlopen
import json

class BilibiliCrawler:
    def __init__(self, start: str, end: str, max_page: str):
        self.start_date = start
        self.end_date = end
        self.max_page = max_page

    def _generate_url(self, page):
        suffix = self.start_date + "," + self.end_date
        url = "https://www.bilibili.com/v/tech/digital/" \
        f"?spm_id_from=333.5.b_746563685f6469676974616c.15#/all/click/0/{page}/" + suffix
        return url

    def crawlIds(self) -> List:
        """ Returns a list of video id and associated user id.
        """

        ids = []
        with webdriver.Chrome() as driver:
            for page in range(1, self.max_page + 1):
                url = self._generate_url(page)
                driver.get(url)
                
                try:
                    # Wait until the items are loaded
                    WebDriverWait(driver, 20, 0.5).until(
                        EC.presence_of_all_elements_located((By.CLASS_NAME, "l-item")))
                    soup = BeautifulSoup(driver.page_source, "lxml")
                    items = soup.find_all("div", {"class": "l-item"})

                    for item in items:
                        video_id = item.find("a")["href"][25:]
                        user_id = item.find("a", {"class": "v-author"})["href"][22:]
                        ids.append((video_id, user_id))

                finally:
                    continue
        
        return ids

    def crawlVideoRecords(self, ids: List) -> VideoRecord:
        """ Returns video records associated with given
        urls.
        """
        records = []
        with webdriver.Chrome() as driver:
            for id in ids:
                record = VideoRecord()

                video_url = "https://www.bilibili.com/video/" + id[0]
                driver.get(video_url)
                WebDriverWait(driver, 20, 0.5).until(
                    EC.presence_of_all_elements_located((By.CLASS_NAME, "reply-wrap")))

                soup = BeautifulSoup(driver.page_source, "lxml")

                # Metadata
                record.url = video_url
                record.author_id = id[1]
                record.title = soup.find("span", {"class": "tit"}).contents[0].strip()

                description_section = soup.find("div", {"class": "desc-info"})
                if description_section.contents and \
                    description_section.contents[0]:

                    record.description = description_section.contents[0].text.strip()

                apiUrl = "https://api.bilibili.com/x/web-interface/view?bvid=" + \
                    id[0]
                response = urlopen(apiUrl)
                response_json = json.load(response)
                record.cover_url = response_json["data"]["pic"]

                # Stats data
                data_content = soup.find("div", {"class": "video-data"}).contents
                record.plays = data_content[0].text[:-5]
                record.shoots = data_content[1].text[:-2]
                record.time = data_content[2].text.strip()

                # Other stats
                record.likes = soup.find("span", {"class": "like"}).text.strip()
                record.coins = soup.find("span", {"class": "coin"}).text.strip()
                record.stars = soup.find("span", {"class": "collect"}).text.strip()

                ## Comments
                comments = []
                comment_sections = soup.find_all("div", {"class": "list-item reply-wrap"}, limit=5)
                for section in comment_sections:
                    comment = Comment()
                    comment.user_name = section.find("a", {"class": "name"}).text
                    comment.text = section.find("p", {"class": "text"}).text

                    user_id = section.find("a", {"class": "name"})['href'][21:]
                    with urlopen("https://api.bilibili.com/x/space/acc/info?mid="\
                         + user_id) as response:
                         response = json.load(response)
                         comment.avatar_url = response['data']['face']

                    comments.append(comment)
                
                record.comments = comments

craler = BilibiliCrawler("2021-08-01", "2021-08-31", 1)
urls = craler.crawlIds()
craler.crawlVideoRecords(urls)
