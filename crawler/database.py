import sqlite3
from datatypes import VideoRecord, User
from typing import List
import json

class BilibiliDatabase:
    def __init__(self, file="db.sqlite3"):
        self.connection = sqlite3.connect(file)
        self._create_table()

    def _create_table(self):
        cursor = self.connection.cursor()
        create_user_cmd = r"""CREATE TABLE IF NOT EXISTS user (
            id CHAR(15) PRIMARY KEY NOT NULL,
            name TEXT,
            bio TEXT,
            avatar_url TEXT,
            fan_num VARCHAR(10),
            subs_num VARCHAR(10),
            videos TEXT
        )
        """

        create_video_cmd = r"""CREATE TABLE IF NOT EXISTS video (
            id CHAR(15) PRIMARY KEY NOT NULL,
            title TEXT,
            description TEXT,
            url TEXT,
            cover_url TEXT,
            plays VARCHAR(10),
            shoots VARCHAR(10),
            time VARCHAR(20),
            likes VARCHAR(10),
            coins VARCHAR(10),
            stars VARCHAR(10),
            author_id CHAR(12),
            comments TEXT
        )
        """

        cursor.execute(create_user_cmd)
        cursor.execute(create_video_cmd)
        cursor.close()

    def insert_video_records(self, records: List[VideoRecord]):
        cursor = self.connection.cursor()

        cmd = r"""INSERT OR REPLACE INTO video VALUES (
            ?, ?, ?, ?, ? ,? ,? ,?, ?
            , ?, ?, ?, ? )
        """
        for record in records:
            comments = json.dumps(record.comments, ensure_ascii=False)
            cursor.execute(cmd, (record.id, record.title,
                                 record.description, record.url, record.cover_url,
                                 record.plays, record.shoots, record.time, record.likes,
                                 record.coins, record.stars, record.author_id, comments))
            self.connection.commit()
        cursor.close()

    def insert_user_records(self, users: List[User]):
        cursor = self.connection.cursor()
        cmd = r"""INSERT OR REPLACE INTO user VALUES (
            ?, ?, ?, ?, ? ,? ,? )
        """

        for user in users:
            videos = json.dumps(user.videos, ensure_ascii=False)
            cursor.execute(cmd, (user.id, user.name, user.bio, user.avatar_url,
                               user.fan_num, user.subscription_num, videos))
            self.connection.commit()
        cursor.close()


    def select_video_user_records(self, offset: int) -> List:
        """Returns a full list of tuple containing the video id
        and its associated user.
        """
        cursor = self.connection.cursor()

        cmd = f"SELECT id, author_id FROM video LIMIT -1 OFFSET {offset}"

        records = []
        for row in cursor.execute(cmd):
            records.append((row[0], row[1]))

        cursor.close()
        return records
