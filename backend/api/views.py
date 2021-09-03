from django.http import JsonResponse
from django.http.request import HttpRequest
from .models import Video, User
from typing import List
import json

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
        videos = query_videos(page, count)
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
    
    else:
        return create_error_response(-1, "Invalid parameter 'type'")

def query_videos(page: int, count: int) -> str:
    offset = (page - 1) * count
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


# Create response
def create_error_response(code: int, msg: str) -> JsonResponse:
    return JsonResponse({"code": code, "msg": msg})


def create_success_response(obj):
    return JsonResponse({"code": 0, "data": obj}, safe=False,
                        json_dumps_params={"ensure_ascii": False})
