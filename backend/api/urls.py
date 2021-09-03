from django.urls import path

from . import views

urlpatterns = [
    path('list', views.get_list, name='list'),
    path("video", views.get_video, name="video"),
    path("user", views.get_user, name="user"),
    path("stats", views.get_stats, name="stats")
]
