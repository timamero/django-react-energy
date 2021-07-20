from rest_framework import serializers
from energyapi.models import EnergyData

class EnergyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnergyData
        fields = [
            'id',
            'region',
            'category',
            'classification',
            'subclassification',
            'total_number_of_housing_units',
            'total_energy_consumption',
            'energy_consumption_per_household',
            'energy_consumption_per_household_member',
            'energy_consumption_per_square_foot',
            'total_energy_expenditures',
            'energy_expenditure_per_household',
            'energy_expenditure_per_household_member',
            'energy_expenditure_per_square_foot'
        ]