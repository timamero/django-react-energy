from django.urls import path
from energyapi import views


urlpatterns = [
    path('energydata', views.EnergyDataList.as_view()),
    path('energydata/<int:pk>', views.EnergyDetail.as_view()),
    path('energydata/Northeast', views.NortheastList.as_view()),
    path('energydata/Midwest', views.MidwestList.as_view()),
    path('energydata/South', views.SouthList.as_view()),
    path('energydata/West', views.WestList.as_view()),
]
