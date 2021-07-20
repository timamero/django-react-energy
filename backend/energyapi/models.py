from django.db import models


class EnergyData(models.Model):
    """
    Model containing energy consumption and energy expenditure data for different regions, categories, and classifications.
    Data source: https://www.eia.gov/consumption/residential/data/2015/index.php?view=consumption#summary
    """
    id = models.IntegerField(primary_key=True)
    region = models.CharField(max_length=10)
    category = models.CharField(max_length=50)
    classification = models.CharField(max_length=70)
    subclassification = models.CharField(max_length=20)
    total_number_of_housing_units = models.FloatField()
    total_energy_consumption = models.FloatField()
    energy_consumption_per_household = models.FloatField()
    energy_consumption_per_household_member = models.FloatField()
    energy_consumption_per_square_foot  = models.FloatField()
    total_energy_expenditures = models.FloatField()
    energy_expenditure_per_household = models.FloatField()
    energy_expenditure_per_household_member = models.FloatField()
    energy_expenditure_per_square_foot = models.FloatField()

