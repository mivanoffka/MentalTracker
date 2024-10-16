from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
from datetime import datetime as Datetime
from .models import Record
from typing import List
import json

def add_record(request, uid, value, datetime):
    print(request)
    print(value)
    print(datetime)

    try:
        record = Record.objects.create(uid=uid, value=int(value), datetime=Datetime.strptime(datetime, "%d-%m-%Y-%H:%M"))
        record.save()

        return HttpResponse(
            json.dumps(
                jsonify_list(
                    _get_all_records(int(uid))
                )
            ), content_type="application/json"
        )
    except Exception as e:
        return HttpResponse(str(e))

def truncate(request, uid):
    Record.objects.all().delete()
    return HttpResponse(
                json.dumps(
                    jsonify_list(
                        _get_all_records(int(uid))
                    )
                ), content_type="application/json"
            )
    

def fetch(requiest, uid): 
    a = jsonify_list(
                _get_all_records(int(uid))
                )
    for i in a:
        print(i)

    return HttpResponse(
        json.dumps(a), content_type="application/json"
    )
    

def jsonify_list(records: List[Record]):
    return [record.as_json() for record in records]

def _get_all_records(uid) -> List[Record]: 
    return Record.objects.filter(uid=uid).order_by("datetime")

def _stringify(records: List[Record]):
    list = ""
    for record in records:
        list += f"\r\n{record.id}: value {record.value} from {record.uid} at {record.datetime}"
    return list



    