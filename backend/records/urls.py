from django.urls import path
from . import views

urlpatterns = [
    path('add/token=<str:token>&value=<str:value>&datetime=<str:datetime>&model=<str:model>', views.add),
    path('fetch/token=<str:token>&model=<str:model>', views.fetch),
    path('truncate/token=<str:token>&model=<str:model>', views.truncate),
    path('delete/token=<str:token>&id=<str:id>&model=<str:model>', views.delete),
    path('update/token=<str:token>&id=<str:id>&value=<str:value>&datetime=<str:datetime>&model=<str:model>', views.update)
]