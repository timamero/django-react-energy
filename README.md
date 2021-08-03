# Energy Consumption Comparison

[Go to energy consumption comparison website](https://fc-energy-comparison.netlify.app/)

## Overview
Django + React Application

User enters their annual energy consumption/expenditure and can compare it to average consumption/expenditure based on all homes, homes in specific regions, or specified categories/classifications. 

### Data
The energy consumption data is from the [Residential Energy Consumption Survey](https://www.eia.gov/consumption/residential/data/2015/index.php?view=consumption#summary).

There is a total of 259 records.

## Django Backend
The energy data API can be accessed at [https://fc-energy.herokuapp.com/energydata](https://fc-energy.herokuapp.com/energydata)

### Energy Data API Usage
To get all data
```
https://fc-energy.herokuapp.com/energydata
```
To get data by id (last index is 258)
```
https://fc-energy.herokuapp.com/energydata/<id>
```
To get list of data by region
```
https://fc-energy.herokuapp.com/energydata/Northeast
```
    Regions
    - Northeast
    - Midwest
    - South
    - West

### How to Install Backend
1. Download or clone this repository
    ```
    git clone https://github.com/timamero/django-react-energy-comparison.git
    ```
2. Go to backend folder
    ```
    cd backend
    ```
3. Create a virtual environment
    ```
    py -m venv venv
    ```
4. Install dependencies
    ```
    pip install -r requirements.txt
    ```
    Note: This project was configured with PostgreSQL. [See steps to set up postgresql in Django here](https://github.com/timamero/django-starting-template/blob/main/postgresql/configure-postgresql-database.md). This project can be configured with any database but note that the instructions below to copy the data work only with PostgreSQL.
5. Install python-dotenv
    ```
    pip install python-dotenv
    ```
6. In the energy folder (which contains settings.py), add a .env file configured with the following environment variables.
    ```
    DJANGO_ENV=development
    DJANGO_DEBUG=True
    DB_NAME=<db_name>
    DB_USER=<db_user>
    DB_PASSWORD=<db_password>
    SECRET_KEY=<your_secret_key>
    HOST=*
    ```
    - [Generate a new secret key](https://humberto.io/blog/tldr-generate-django-secret-key/) 
7. Run database migrations
    ```
    py manage.py makemigrations
    py manage.py migrate
    ```
8. To transfer energy data to PostgreSQL, navigate to the python transfer script backend/data/scripts/copy_data_to_postgresql.py. Follow the instructions in the file to make the appropriate changes, then run it.
9. Run server (make sure you are inside the backend folder)
    ```
    py manage.py runserver
    ```
10. Go to the URL [127.0.0.1:8000/energydata](127.0.0.1:8000/energydata)

## React Frontend
The front end was create with create-react-app.

### How to install Front-end
1. Download or clone this repository
    ```
    git clone https://github.com/timamero/django-react-energy-comparison.git
    ```
2. Go to frontend folder
    ```
    cd frontend
    ```
3. Install dependencies
    ```
    npm install
    ```
4. Start application
    ```
    npm run start
    ```
5. Go to the URL [http://localhost:3000](http://localhost:3000a)


## References
[Source of data](https://www.eia.gov/consumption/residential/data/2015/index.php?view=consumption#summary)

https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react