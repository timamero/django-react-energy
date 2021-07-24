import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import ResultTabs from './components/ResultTabs';
import theme from './theme/theme'
import { useStyles } from './styles/styles'

import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { FormControl, FormLabel, FormGroup, InputLabel, Input, RadioGroup, Radio, FormControlLabel, FormHelperText } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';


const App = () => {
  const classes = useStyles()

  const btuPerKwh = 3412.14
  const dataBtuMultiple = 1000000

  const [showForm, setShowForm] = useState('block')
  const [showResults, setShowResults] = useState('none')
  
  const [region, setRegion] = useState('')
  const [regionHelperText, setRegionHelperText] = useState('Select a region in the U.S')
  const [regionData, setRegionData] = useState([])
  const [category, setCategory] = useState('All homes')

  const [inputAmount, setinputAmount] = useState('')
  const [energyPerHouseHold, setEnergyPerHouseHold] = useState(null)
  const [difference, setDifference] = useState(null)

  const [classification, setClassification] = useState(null)
  const [subclassification, setSubclassification] = useState(null)
  const [selection, setSelection] = useState('')
  const [tabValue, setTabValue] = React.useState(0);

  const [isCompareConsumption, setIsCompareConsumption] = useState(true)
  
  useEffect(() => {
    if (regionData.length === 0) {
      return
    }

    const categoryData = regionData.filter(data => data.category === category)
    if (category === 'All homes') {
      if (isCompareConsumption) {
        setDifference(calculateDifference(inputAmount,convertDataEnergy(categoryData[0].energy_consumption_per_household)))
        setEnergyPerHouseHold((convertDataEnergy(categoryData[0].energy_consumption_per_household)))
      } else {
        setDifference(calculateDifference(inputAmount, categoryData[0].energy_expenditure_per_household))
        setEnergyPerHouseHold(categoryData[0].energy_expenditure_per_household)
      }

    } else {
      setClassification(categoryData.map(data => {
        return {"id": data.id, "name": data.classification}
        })
      )
      setSubclassification(categoryData.map(data => data.subclassification))
      
      if (selection) {
        if (isCompareConsumption) {
          setDifference(calculateDifference(inputAmount,convertDataEnergy(categoryData.find(item => item.id === Number(selection)).energy_consumption_per_household)))
          setEnergyPerHouseHold((convertDataEnergy(categoryData.find(item => item.id === Number(selection)).energy_consumption_per_household)))
        } else {
          setDifference(calculateDifference(inputAmount,categoryData.find(item => item.id === Number(selection)).energy_expenditure_per_household))
          setEnergyPerHouseHold((categoryData.find(item => item.id === Number(selection)).energy_expenditure_per_household))
        }
        
      }   
    }
  
  }, [regionData, category, inputAmount, tabValue, selection])

  const handleinputAmountChange = (event) => {
    setinputAmount(event.target.value)
  }

  const handleRegionChange = (event) => {
    setRegion(event.target.value)
    setRegionHelperText(`You selected ${event.target.value}`)
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.textContent)
    setSelection('')
  }

  const handleSelectionChange = (event) => {
    setSelection(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const regionValue = event.target.elements.region.value
    axios
      .get(`http://127.0.0.1:8000/energydata/${regionValue}`)
      .then(response => {
        setRegionData(response.data)
        setShowForm('none')
        setShowResults('block')
      })
  }

  const handleTabChange = (event, newTabValue) => {
    console.log('tab', event.target.value)
    setTabValue(newTabValue);
  };

  const handleCompareConsumptionChange = () => {
    setIsCompareConsumption(!isCompareConsumption)
    console.log('handleCompareType clicked')
  }

  const handleReset = () => {
    console.log('reset')
    setTabValue(0)
    setShowForm('block')
    setShowResults('none')
    setinputAmount('')
    setRegionData([])
    setRegion('')
    setCategory('All homes')
    setClassification(null)
    setSubclassification(null)
    setSelection('')
    setEnergyPerHouseHold(null)
    setDifference(null)
    setRegionHelperText('Select a region in the U.S')
  }
  
  function convertDataEnergy(energyInBtu) {
    return (energyInBtu*dataBtuMultiple/btuPerKwh).toFixed(2)
  }

  function calculateDifference(consumed, data) {
    return (consumed - data).toFixed(2)
  }
  
  console.log('rendered app')
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">   
          <Typography variant="h1" theme={theme} align="center">How Energy Efficient Are You?</Typography>
          <Box display={showForm}>
            <FormGroup>
              <FormControlLabel
                control={<Switch 
                  checked={isCompareConsumption}
                  onChange={handleCompareConsumptionChange}
                />}
                label={isCompareConsumption? 'Compare energy consumption in kWh': 'Compare energy expenditure in USD'}
              />
            </FormGroup>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={5} justifyContent="center" alignItems="center">

                <Grid item xs={12}>
                  <FormControl focused={true} fullWidth={true}>
                    <InputLabel>Annual energy {isCompareConsumption ? 'consumption in kWh: ': 'expenditure in USD'}</InputLabel>
                    <Input value={inputAmount} onChange={handleinputAmountChange} type="number" name="annual-energy" id="annual-energy" required/>
                    <FormHelperText>Get your energy bills from the last 12 months and add up the amount of electricity you {isCompareConsumption ? 'consumed' : 'paid for'}.</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl component="fieldset" className={classes.alignItemsAndJustifyContent}>
                        <FormLabel component="legend" className={classes.centerText}>Region</FormLabel>
                        <RadioGroup aria-label="region" name="region" value={region} onChange={handleRegionChange} style={{margin: "auto"}} row required>
                          <FormControlLabel value="Northeast" control={<Radio required={true}/>} label="Northeast" />
                          <FormControlLabel value="Midwest" control={<Radio required={true}/>} label="Midwest" />
                          <FormControlLabel value="South" control={<Radio required={true}/>} label="South" />
                          <FormControlLabel value="West" control={<Radio required={true}/>} label="West" />
                        </RadioGroup>
                        <FormHelperText className={classes.centerText}>{regionHelperText}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.alignItemsAndJustifyContent}>
                  <Button variant="contained" color="primary" type="submit" style={{textAlign: "center"}}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>    
          </Box>
          
          <ResultTabs 
            inputAmount={inputAmount}
            isCompareConsumption={isCompareConsumption}
            selection={selection}
            handleSelectionChange={handleSelectionChange}
            tabValue={tabValue}
            handleTabChange={handleTabChange}
            showResults={showResults} 
            handleReset={handleReset}
            handleCategoryChange={handleCategoryChange}
            region={region}
            category={category}
            classification={classification}
            subclassification={subclassification}
            difference={difference}
            energyPerHouseHold={energyPerHouseHold}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
