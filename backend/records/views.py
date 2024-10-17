from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
from datetime import datetime as Datetime
from .models import Record
from typing import List
import json

def add_record(request, uid, value, datetime):
    try:
        record = Record.objects.create(uid=uid, value=int(value), datetime=Datetime.strptime(datetime, "%d-%m-%Y-%H:%M"))
        record.save()

        return _send_records(uid)
    except Exception as e:
        return HttpResponse(str(e))
    
def delete_record(request, uid, id):
    try:
        record: Record = Record.objects.filter(id=id).first()
        if record.uid != int(uid):
            raise Exception("Attempted to delete a record that belongs to another user.")
        record.delete()

        return _send_records(uid)
    except Exception as e:
        return HttpResponse(str(e))

def update_record(request, uid, id, value, datetime):
    try:
        record: Record = Record.objects.filter(id=id).first()
        if record.uid != int(uid):
            raise Exception("Attempted to delete a record that belongs to another user.")
        record.value = int(value)
        record.datetime = datetime=Datetime.strptime(datetime, "%d-%m-%Y-%H:%M")
        record.save()

        return _send_records(uid)
    except Exception as e:
        return HttpResponse(str(e))

def truncate(request, uid):
    try:
        Record.objects.all().delete()
        return _send_records(uid)
    except Exception as e:
        return HttpResponse(str(e))

def fetch(request, uid): 
    return _send_records(uid)
    
def _send_records(uid):
    return HttpResponse(
            json.dumps(
                _jsonify_list(
                    _get_all_records(int(uid))
                )
            ), content_type="application/json"
        )

def _jsonify_list(records: List[Record]):
    return [record.as_json() for record in records]

def _get_all_records(uid) -> List[Record]: 
    return Record.objects.filter(uid=uid).order_by("datetime")

def _stringify(records: List[Record]):
    list = ""
    for record in records:
        list += f"\r\n{record.id}: value {record.value} from {record.uid} at {record.datetime}"
    return list



    