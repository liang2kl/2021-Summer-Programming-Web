# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
import json


class User(models.Model):
    id = models.CharField(max_length=15, primary_key=True)
    name = models.TextField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    avatar_url = models.TextField(blank=True, null=True)
    fan_num = models.CharField(max_length=10, blank=True, null=True)
    subs_num = models.CharField(max_length=10, blank=True, null=True)
    videos = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'


class Video(models.Model):
    id = models.CharField(max_length=15, primary_key=True)
    title = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    url = models.TextField(blank=True, null=True)
    cover_url = models.TextField(blank=True, null=True)
    plays = models.CharField(max_length=10, blank=True, null=True)
    shoots = models.CharField(max_length=10, blank=True, null=True)
    time = models.CharField(max_length=20, blank=True, null=True)
    likes = models.CharField(max_length=10, blank=True, null=True)
    coins = models.CharField(max_length=10, blank=True, null=True)
    stars = models.CharField(max_length=10, blank=True, null=True)
    author_id = models.CharField(max_length=12, blank=True, null=True)
    comments = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'video'
