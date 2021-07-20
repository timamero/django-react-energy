"""
Convert string values to numbers and convert non-number types to number type
"""
import pandas as pd
import numpy as np

# Create dataframe object from csv
df = pd.read_csv('../1-processed/ce_combined.csv', header=0)

# Replace ',' in strings to ''
df = df.replace(',','', regex=True)

# Replace 'Q' and 'N' with numbers since it will be in an IntegerField
df = df.replace(to_replace='Q', value=-1)
df = df.replace(to_replace='N', value=-2)

# Convert columns with numbers from str to int and float data type
df_with_numbers = df[[
    'total_number_of_housing_units',
    'total_energy_consumption',
    'energy_consumption_per_household',
    'energy_consumption_per_household_member',
    'energy_consumption_per_square_foot',
    'total_energy_expenditures',
    'energy_expenditure_per_household',
    'energy_expenditure_per_household_member',
    'energy_expenditure_per_square_foot'
    ]]
df_with_numbers = df_with_numbers.apply(pd.to_numeric)
df[[
    'total_number_of_housing_units',
    'total_energy_consumption',
    'energy_consumption_per_household',
    'energy_consumption_per_household_member',
    'energy_consumption_per_square_foot',
    'total_energy_expenditures',
    'energy_expenditure_per_household',
    'energy_expenditure_per_household_member',
    'energy_expenditure_per_square_foot'
    ]] = df_with_numbers

print(df.info())
print(df.head())

df.to_csv('../1-processed/ce_combined_converted.csv', index=False, encoding='utf-8-sig')