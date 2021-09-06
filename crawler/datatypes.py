from typing import List
import json

class VideoRecord:
    def __init__(self, id="", title="", description="", url="",
    cover_url="", plays="", shoots="", time="", likes="", coins="",
    stars="", author_id="", comments=[]):
        self.id = id
        self.title = title
        self.description = description
        self.url = url
        self.cover_url = cover_url
        self.plays = plays
        self.shoots = shoots
        self.time = time
        self.likes = likes
        self.coins = coins
        self.stars = stars
        self.author_id = author_id
        self.comments = comments

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
    def __init__(self, id="", name="", bio="", avatar_url = "", 
    fan_num="", subscription_num="", videos=[]):
        self.id = id
        self.name = name
        self.bio = bio
        self.avatar_url = avatar_url
        self.fan_num = fan_num
        self.subscription_num = subscription_num
        self.videos = videos
