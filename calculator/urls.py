from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name = 'calculator'),
    path('about', views.about, name = 'about'),
    path('add_account', views.add_account, name = 'add_account'),
    path('table', views.players_table, name = 'players_table'),
    path('random', views.page_random, name = 'Random'),
    path('quiz', views.page_quiz, name = 'quiz'),
]
