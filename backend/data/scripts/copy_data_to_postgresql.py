"""
Transfer data from csv to PostgreSQL database
"""
import psycopg2

import sys
sys.path.append(r"C:\Users\fcame\DevProjects\DjangoReact\energyEfficiencyComparison-v2\backend\data\scripts")

from secrets import *

# Reference: https://www.dataquest.io/blog/loading-data-into-postgres/

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