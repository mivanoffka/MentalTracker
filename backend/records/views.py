import json
from datetime import datetime as Datetime
from typing import List

from django.http import HttpResponse, JsonResponse

from .models import Record
from accounts.models import Account, Token
from responses import ok_response, unknow_error_response


def add(request, token, value, datetime, model):
    try:       
        token = Token.objects.filter(value=token).first()
        if token:
            if token.is_relevant:
                uid = token.account.id
                record = Record.objects.create(uid=uid, value=int(value),
                                       datetime=Datetime.strptime(datetime, "%d-%m-%Y-%H:%M"), model_id=model)
                record.save()
                return _send_records(uid, model)
        
        raise Exception("Authentication token outdated or invalid.")
    except Exception as e:
        return HttpResponse(str(e))


def delete(request, token, id, model):
    try:
        token = Token.objects.filter(value=token).first()
        if token:
            if token.is_relevant:
                uid = token.account.id
                record: Record = Record.objects.filter(id=id).first()
                if record.uid != int(uid):
                    raise Exception("Attempted to delete a record that belongs to another user.")
                record.delete()

                return _send_records(uid, model)
        
        raise Exception("Authentication token outdated or invalid.")
    except Exception as e:
        return unknow_error_response(e)


def update(request, token, id, value, datetime, model):
    try:
        token = Token.objects.filter(value=token).first()
        if token:
            if token.is_relevant:
                uid = token.account.id

                record = Record.objects.filter(id=id).first()
                if record.uid != int(uid):
                    raise Exception("Attempted to delete a record that belongs to another user.")
                record.value = int(value)
                record.datetime = Datetime.strptime(datetime, "%d-%m-%Y-%H:%M")
                record.save()

                return _send_records(uid, model)
            
        raise Exception("Authentication token outdated or invalid.")
    except Exception as e:
        return unknow_error_response(e)

def truncate(token, model):
    try:
        Record.objects.all().delete()
        return ok_response()
    except Exception as e:
        return unknow_error_response(e)

def fetch(request, token, model):
    try:
        print(token)
        token = Token.objects.filter(value=token).first()
        if token:
            if token.is_relevant:
                uid = token.account.id
                return _send_records(uid, model)
            
        raise Exception("Authentication token outdated or invalid.")
    except Exception as e:
        return unknow_error_response(e)

def _send_records(uid, model):
    return JsonResponse(
        {"status": "0",
        "content" : _jsonify_list(
            _get_all_records(int(uid), int(model))
        )
        },
        safe=False
    )

def _jsonify_list(records: List[Record]):
    return [record.as_json() for record in records]

def _get_all_records(uid, model) -> List[Record]:
    return Record.objects.filter(uid=uid, model_id=model).order_by("datetime")


def _stringify(records: List[Record]):
    list = ""
    for record in records:
        list += f"\r\n{record.id}: value {record.value} from {record.uid} at {record.datetime}"
    return list
