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
# class EnergyDataList(generics.ListAPIView):
#     """
#     List all energy data
#     """
#     def get(self, request, format=None):
#         energy_data = EnergyData.objects.all()
#         serializer = EnergyDataSerializer(energy_data, many=True)
#         return Response(serializer.data)


## The following view is what is currently working with frontend
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


class EnergyDetail(generics.RetrieveAPIView):
    """
    Retrieve a single energy data record
    """
    # def get_object(self, pk):
    #     try:
    #         return EnergyData.objects.get(pk=pk)
    #     except EnergyData.DoesNotExist:
    #         raise Http404
    queryset = EnergyData.objects.all()
    serializer_class = EnergyDataSerializer
        
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
