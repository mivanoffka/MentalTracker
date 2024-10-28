from django.db import models

class Record(models.Model):
    id = models.IntegerField(primary_key=True)
    uid = models.IntegerField()
    value = models.IntegerField()
    datetime = models.DateTimeField(null=True)
    model_id = models.IntegerField()

    def as_json(self):
        return dict(key=self.id,
                    uid=self.uid,
                    value=self.value,
                    datetime=self.datetime.strftime("%d-%m-%Y-%H:%M"),
                    model_id=self.model_id,
                    )