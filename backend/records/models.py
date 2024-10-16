from django.db import models
from datetime import datetime


class Record(models.Model):
    uid = models.IntegerField()
    value = models.IntegerField()
    datetime = models.DateTimeField(null=True)

    def as_json(self):
        return dict(key=self.id, uid=self.uid, value=self.value, datetime=self.datetime.strftime("%d-%m-%Y-%H:%M"))