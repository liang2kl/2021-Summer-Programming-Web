from django.http import JsonResponse
from django.http.request import HttpRequest
from django.http.response import HttpResponse
from .models import Video, User
from typing import List
import json
import time

# List
def get_list(request: HttpRequest):
    page = int(request.GET.get("page", "1"))
    count = int(request.GET.get("count", "50"))
    list_type = request.GET.get("type", None)

    # TODO: Validate `page`
    # Maximum 100 records
    count = min(count, 100)
    
    if not list_type:
        return create_error_response(-1, "Missing parameter 'type'")
    elif list_type == "v":
        videos = query_videos(None, page, count)
        if videos:
            return create_success_response(videos)
        else:
            return create_error_response(-1, "Invalid parameter 'page'")
    
    elif list_type == "u":
        users = query_users(page, count)
        if users:
            return create_success_response(users)
        else:
            return create_error_response(-1, "Invalid parameter 'page'")
    
    elif list_type == "uv":
        author_id = request.GET.get("id", None)
        if author_id:
            videos = query_videos(author_id, page, count)
            if videos:
                return create_success_response(videos)
            else:
                return create_error_response(-1, "Invalid parameter 'page'")
        else:
            return create_error_response(-1, "Invalid parameter 'id'")

    else:
        return create_error_response(-1, "Invalid parameter 'type'")


def query_videos(author_id: str, page: int, count: int) -> str:
    offset = (page - 1) * count
    query = None

    if author_id:
        query = list(Video.objects.filter(author_id=author_id).values()[offset: offset + count])
    else:
        query = list(Video.objects.values()[offset: offset + count])

    for video in query:
        video["comments"] = json.loads(video["comments"])

    return query

def query_users(page: int, count: int) -> List[User]:
    offset = (page - 1) * count
    query = list(User.objects.values()[offset: offset + count])

    return query

# Video
def get_video(request: HttpRequest):
    q_id = request.GET.get("id", None)
    if not q_id:
        return create_error_response(-1, "Missing parameter 'id'")
    
    try: 
        video = Video.objects.filter(id=q_id).values().first()
        if video:
            video["comments"] = json.loads(video["comments"])
            return create_success_response(video)
        else:
            return create_error_response(-1, f"No record matches id {q_id}")

    except:
        return create_error_response(-1, "Unexpected error")

# User
def get_user(request: HttpRequest):
    q_id = request.GET.get("id", None)
    if not q_id:
        return create_error_response(-1, "Missing parameter 'id'")

    try:
        user = User.objects.filter(id=q_id).values().first()
        if user:
            user["videos"] = json.loads(user["videos"])
            return create_success_response(user)
        else:
            return create_error_response(-1, f"No record matches id {q_id}")

    except:
        return create_error_response(-1, "Unexpected error")

# Stats
def get_stats(request: HttpRequest):
    stats_type = request.GET.get("type", None)

    if stats_type == "v":
        count = Video.objects.count()
        return create_success_response(count)

    elif stats_type == "u":
        count = User.objects.count()
        return create_success_response(count)
    
    else:
        return create_error_response(-1, "Invalid 'type' parameter")

# Search
def search(request: HttpRequest):
    q_type = request.GET.get("type", None)
    keyword = request.GET.get("q", None)

    if not keyword:
        return create_error_response(-1, "Missing parameter 'q'")

    object = None
    start_time = time.time_ns()
    if q_type == "v":
        object = get_search_videos(keyword)
    elif q_type == "u":
        object = get_search_users(keyword)
    else:
        return create_error_response(-1, "Missin parameter 'type'")
    
    end_time = time.time_ns()
    interval = (end_time - start_time) / (10 ** 9)

    return create_search_response(object, interval)

def get_search_videos(keyword: str):
    query = list(Video.objects.filter(title__icontains=keyword).values())
    return query

def get_search_users(keyword: str):
    query = list(User.objects.filter(name__icontains=keyword).values())
    return query

# Create response
def create_error_response(code: int, msg: str) -> JsonResponse:
    return JsonResponse({"code": code, "msg": msg})


def create_success_response(obj):
    return JsonResponse({"code": 0, "data": obj}, safe=False,
                        json_dumps_params={"ensure_ascii": False})


def create_search_response(obj, interval):
    return JsonResponse({"code": 0, "data": obj, "interval": interval}, safe=False,
                        json_dumps_params={"ensure_ascii": False})
