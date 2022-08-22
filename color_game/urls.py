from django.urls import path
from . import views

urlpatterns = [
    path('', views.page_color_game, name = 'color_game'),
]