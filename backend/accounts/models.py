import string
import random
from django.db import models

class Account(models.Model):
    username = models.CharField(max_length=64)
    password_hash = models.CharField(max_length=64)

class Token(models.Model):
    value = models.CharField(max_length=32)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    is_relevant = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.value:
            existing_tokens = [Token.objects.values_list('value', flat=True)]
            existing_tokens.append("")
            token = ""
            while token in existing_tokens:
                token = self._generate_token_value()
                
            self.value = token
        super(Token, self).save(*args, **kwargs)

    @staticmethod
    def _generate_token_value():
        chars = string.ascii_letters
        token = ""
        for i in range(32):
            token += random.choice(chars)
        
        return token


    