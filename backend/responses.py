from typing import Dict, Optional
from django.http import JsonResponse


def response(status: int, content: Optional[Dict] = None):
    content = content if content else {}
    return JsonResponse({"status": str(status), "content": content})

def ok_response(content: Optional[Dict] = None):
    return response(0, content)

def unknow_error_response(exception: Exception):
    return JsonResponse(1, {"message": str(exception)})

def user_already_exists_response():
    return response(2)

def incorrect_username_response():
    return response(3)

def incorrect_password_response():
    return response(4)