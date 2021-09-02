import sqlite3
from datetime import datetime
from datatypes import VideoRecord, User
from typing import List
import json

class BilibiliDatabase:
    def __init__(self, file="db.sqlite3"):
        self.connection = sqlite3.connect(file)
        self.cursor = self.connection.cursor()
        self._create_table()

    def _create_table(self):
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

        self.cursor.execute(create_user_cmd)
        self.cursor.execute(create_video_cmd)

    def insert_video_records(self, records: List[VideoRecord]):
        cmd = r"""INSERT OR REPLACE INTO video VALUES (
            ?, ?, ?, ?, ? ,? ,? ,?, ?
            , ?, ?, ?, ? )
        """
        for record in records:
            comments = json.dumps(record.comments, ensure_ascii=False)
            self.cursor\
                .execute(cmd, (record.id, record.title,
                         record.description, record.url, record.cover_url,
                         record.plays, record.shoots, record.time, record.likes,
                         record.coins, record.stars, record.author_id, comments))
            self.connection.commit()

    def select_video_records(self, offset: int, count: int) -> List[VideoRecord]:
        assert(offset >= 0 and count > 0)
        cmd = r"""SELECT * FROM video LIMIT ? OFFSET ?
        """

        records = []
        for row in self.cursor.execute(cmd, (count, offset)):
            record = VideoRecord()
            record.id = row[0]
            record.title = row[1]
            record.description = row[2]
            record.url = row[3]
            record.cover_url = row[4]
            record.plays = row[5]
            record.shoots = row[6]
            record.time = row[7]
            record.likes = row[8]
            record.coins = row[9]
            record.stars = row[10]
            record.author_id = row[11]
            record.comments = json.loads(row[12])
            records.append(record)
        
        return records
        



