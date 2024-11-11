from typing import Dict
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json

from .forms import SignInForm
from .models import Account, Token
from responses import (ok_response, unknow_error_response, user_already_exists_response,
                        incorrect_username_response, incorrect_password_response)

def sign_in(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        existing_accounts = Account.objects.filter(username=username).all()
        if existing_accounts:
            account = existing_accounts[0]
            if account.password_hash == password:
                token = Token(account=account)
                token.save()
                return ok_response({"token": token.value})
            else:
                return incorrect_password_response()

        else:
            return incorrect_username_response()
    

def sign_up(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        existing_accounts = Account.objects.filter(username=username).all()
        if existing_accounts:
            return user_already_exists_response()

        new_account = Account(username=username, password_hash=password)
        new_account.save()

        return ok_response()

def reset(request):
    try:
        Account.objects.all().delete()
        return ok_response()
    except Exception as e:
        return unknow_error_response(e)


