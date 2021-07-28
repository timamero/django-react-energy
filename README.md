# Energy Consumption Comparison

## Overview
Django + React Application

User enters their annual energy consumption and can compare it to average consumptions based on all homes, homes in specific regions, or specified categories/classifications. 

### Data
The energy consumption data is from the [Residential Energy Consumption Survey](https://www.eia.gov/consumption/residential/data/2015/index.php?view=consumption#summary).

There is a total of 259 records.

## Django Backend
The energy data API can be accessed at [https://fc-energy.herokuapp.com/energydata](https://fc-energy.herokuapp.com/energydata)

### Usage
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

### How to Install
Instructions...

## React Frontend
...


## References
[Source of data](https://www.eia.gov/consumption/residential/data/2015/index.php?view=consumption#summary)

https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react