from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json

from .forms import SignInForm
from .models import Account, Token

def sign_in(request):
    if request.method == "POST":
        data = json.loads(request.body)  # Парсим JSON-контент запроса
        username = data.get("username")  # Извлекаем значение по ключу
        password = data.get("password")

        existing_accounts = Account.objects.filter(username=username).all()
        if existing_accounts:
            account = existing_accounts[0]
            if account.password_hash == password:
                token = Token(account=account)
                token.save()
                return JsonResponse({'isOk': "true", 'token': token.value})
            else:
                return JsonResponse({'isOk': "false", 'message': "Неверный пароль"})
        else:
            return JsonResponse({'isOk': "false", 'message': "Пользователя с таким именем не существует"})

    
def sign_up(request):
    if request.method == "POST":
        data = json.loads(request.body)  # Парсим JSON-контент запроса
        username = data.get("username")  # Извлекаем значение по ключу
        password = data.get("password")

        existing_accounts = Account.objects.filter(username=username).all()
        if existing_accounts:
            return JsonResponse(
                {'isOk': "false",
                 'message': "Пользователь с таким именем уже существует."},
            )

        new_account = Account(username=username, password_hash=password)
        new_account.save()

        return JsonResponse(
            {'isOk': "true"}
        )

def reset(request):
    try:
        Account.objects.all().delete()
        return JsonResponse(
            {'isOk': "true"}
        )
    except Exception as e:
        return JsonResponse({'isOk': "false", 'message': str(e)})
