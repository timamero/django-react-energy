from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from energyapi.models import EnergyData
from energyapi.serializers import EnergyDataSerializer


class EnergyDataList(generics.ListAPIView):
    """
    List all energy data
    """
    serializer_class = EnergyDataSerializer
    def get_queryset(self):
        queryset = EnergyData.objects.all()
        region = self.request.query_params.get('region')
        if region is not None:
            queryset = queryset.filter(region=region)
        return queryset
