from django.urls import path
from energyapi import views


urlpatterns = [
    path('energydata', views.EnergyDataList.as_view()),
    path('energydata/<int:pk>', views.EnergyDetail.as_view())
]
