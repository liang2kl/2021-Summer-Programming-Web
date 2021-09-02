import os
from requests.api import head
from database import BilibiliDatabase
from datatypes import User
from typing import List
from requests import get
# import json
from fake_useragent import UserAgent
from time import sleep


def get_user(id: str, video_id: str, ua: UserAgent) -> User:
    """Returns a newly-created user object"""

    url = "https://api.bilibili.com/x/space/acc/info?mid=" + id

    user = User()
    user.id = id

    with get(url, headers={"User-Agent": ua.random}) as response:
        response = response.json()
        if response["code"] < 0:
            print(response["message"])
            if response["code"] == -412:
                exit(0)
            return None

        data = response["data"]
        user.name = data["name"]
        user.bio = data["sign"]
        user.avatar_url = data["face"]

    url = "https://api.bilibili.com/x/web-interface/card?mid=" + id

    with get(url, headers={"User-Agent": ua.random}) as response:
        response = response.json()
        if response["code"] < 0:
            print(response["message"])
            if response["code"] == -412:
                exit(0)
            return None

        data = response["data"]
        card = data["card"]
        user.fan_num = data["follower"]
        user.subscription_num = card["attention"]
        user.videos = [video_id]

    return user


def migrate_user(user: User, video_id: str) -> User:
    user.videos.append(video_id)
    return user

if __name__ == "__main__":

    ua = UserAgent(path="crawler/fake_useragent.json")

    file_url = "crawler/user_crawler_config.txt"
    current_idx = 0
    if os.path.isfile(file_url):
        file = open(file_url, "r")
        current_idx = int(file.read()) - 1
        file.close()

    db = BilibiliDatabase()
    info = db.select_video_user_records(offset=current_idx)

    users: List[User] = []

    for index, (video_id, id) in enumerate(info):
        file = open(file_url, "w")
        file.write(str(current_idx))
        file.close()

        current_idx += 1
        print(current_idx)

        exists = False
        for index, user in enumerate(users):
            if user.id == id:
                users[index] = migrate_user(user, video_id)
                exists = True
                break
        
        if exists:
            continue

        sleep(1)
        new_user = get_user(id, video_id, ua)
        if new_user:
            users.append(new_user)


    db.insert_user_records(users)
