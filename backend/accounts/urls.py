# myapp/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('signin/', views.sign_in),
    path('signup/', views.sign_up),
    path('reset/', views.reset)
]
