from typing import List
import json

class VideoRecord:
    def __init__(self):
        self.id = ""
        self.title = ""
        self.description = ""
        self.url = ""
        self.cover_url = ""
        self.plays = ""
        self.shoots = ""
        self.time = ""
        self.likes = ""
        self.coins = ""
        self.stars = ""
        self.author_id = ""
        self.comments = []

    def __str__(self):
        return f"""title: {self.title}
description: {self.description}
url: {self.url}
cover_url: {self.cover_url}
plays: {self.plays}
shoots: {self.shoots}
time: {self.time}
likes: {self.likes}
coins: {self.coins}
stars: {self.stars}
author: {self.author_id}
comments: {[comment.__str__() for comment in self.comments]}
"""

class User:
    def __init__(self):
        self.id = ""
        self.name = ""
        self.bio = ""
        self.avatar_url = ""
        self.fan_num = ""
        self.subscription_num = ""
        self.videos = []
