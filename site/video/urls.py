from django.urls import path

from . import views

urlpatterns = [
    path('list', views.get_list, name='list'),
    path("video", views.get_video, name="video"),
    # TODO: User
    path("stats", views.get_stats, name="stats")
]
