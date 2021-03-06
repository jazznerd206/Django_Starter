from django.urls import path
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('join', index),
    path('newRoom', index),
    path('room/<str:roomCode>', index),
    path('room', index)
]
