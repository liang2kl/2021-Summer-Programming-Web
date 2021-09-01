from django.db import models

# Create your models here.

class Video(models.Model):
    id = models.CharField(max_length=15, primary_key=True, null=False)
    title = models.TextField()
    description = models.TextField()
    url = models.TextField()
    cover_url = models.TextField()
    plays = models.CharField(max_length=10)
    shoots = models.CharField(max_length=10)
    time = models.CharField(max_length=20)
    likes = models.CharField(max_length=10)
    coins = models.CharField(max_length=10)
    stars = models.CharField(max_length=10)
    author_id = models.CharField(max_length=12)
    comments = models.TextField()

class User(models.Model):
    id = models.CharField(max_length=15, primary_key=True, null=False)
    name = models.TextField()
    bio = models.TextField()
    avatar_url = models.TextField()
    fan_num = models.CharField(max_length=10)
    subs_num = models.CharField("Subscription count", max_length=10)
    videos = models.TextField()
