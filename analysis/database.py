import sqlite3
import sys, os
sys.path.append(os.path.dirname(os.getcwd()))
from crawler.datatypes import User, VideoRecord
from typing import List
import json


class Database:
    def __init__(self, file="db.sqlite3"):
        self.connection = sqlite3.connect(file)

    def select_all_videos(self) -> List[VideoRecord]:
        cmd = r"SELECT * FROM video"

        cursor = self.connection.cursor()
        records = []
        
        for row in cursor.execute(cmd):
            record = VideoRecord(*row)
            record.comments = json.loads(record.comments)
            records.append(record)

        cursor.close()
        return records