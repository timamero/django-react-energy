"""
Running this script will transfer data from ce_combined_converted.csv to PostgreSQL database table
CONFIGURE ENVIRONMENT VARIABLES IN backend/energy/.env
"""
# Reference: https://www.dataquest.io/blog/loading-data-into-postgres/
import psycopg2
import os
from dotenv import load_dotenv
load_dotenv('../../energy/.env')

# Connect to energy database
conn = psycopg2.connect(
    host="localhost",
    dbname=os.environ.get('DB_NAME'),
    user=os.environ.get('DB_USER'),
    password=os.environ.get('DB_PASSWORD')
)

# Create Cursor object
cur = conn.cursor()

# Open and copy csv file
with open('../1-processed/ce_combined_converted.csv', 'r') as f:
    next(f)  # Skip header row
    cur.copy_from(f, 'energyapi_energydata', sep=',')

conn.commit()