from django.http import Http404, JsonResponse
from django.http.response import HttpResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.response import Response
from energyapi.models import EnergyData
from energyapi.serializers import EnergyDataSerializer

# This is the model to keep, will be adding list view for each region
class EnergyDataList(generics.ListAPIView):
    """
    List all energy data
    """
    def get(self, request, format=None):
        energy_data = EnergyData.objects.all()
        serializer = EnergyDataSerializer(energy_data, many=True)
        return Response(serializer.data)


class NortheastList(generics.ListAPIView):
    """
    List energy data in Northeast Region
    """
    queryset = EnergyData.objects.filter(region="Northeast")
    serializer_class = EnergyDataSerializer


class MidwestList(generics.ListAPIView):
    """
    List energy data in Midwest Region
    """
    queryset = EnergyData.objects.filter(region="Midwest")
    serializer_class = EnergyDataSerializer


class SouthList(generics.ListAPIView):
    """
    List energy data in South Region
    """
    queryset = EnergyData.objects.filter(region="South")
    serializer_class = EnergyDataSerializer


class WestList(generics.ListAPIView):
    """
    List energy data in West Region
    """
    queryset = EnergyData.objects.filter(region="West")
    serializer_class = EnergyDataSerializer


class EnergyDetail(generics.RetrieveAPIView):
    """
    Retrieve a single energy data record
    """
    queryset = EnergyData.objects.all()
    serializer_class = EnergyDataSerializer
        
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
