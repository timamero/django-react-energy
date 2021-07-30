"""
Running this script will transfer data from ce_combined_converted.csv to PostgreSQL database table
"""
# Reference: https://www.dataquest.io/blog/loading-data-into-postgres/
import psycopg2

import sys
# UPDATE THE PATH TO YOUR LOCAL PATH TO THIS FILE
sys.path.append(r"C:\Users\fcame\DevProjects\DjangoReact\energyEfficiencyComparison-v2\backend\data\scripts")

# COMMENT THIS LINE OUT
from secrets import *

# REPLACE THE DATABASE PARAMETERS BELOW WITH YOUR DATABASE PARAMETERS
# Connect to energy database
conn = psycopg2.connect(
    host="localhost",
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD)

# Create Cursor object
cur = conn.cursor()

# Open and copy csv file
with open('../1-processed/ce_combined_converted.csv', 'r') as f:
    next(f)  # Skip header row
    cur.copy_from(f, 'energyapi_energydata', sep=',')

conn.commit()