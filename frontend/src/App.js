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
import { FormControl, FormLabel, InputLabel, Input, RadioGroup, Radio, FormControlLabel, FormHelperText } from '@material-ui/core';


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

  const [consumptionAmount, setConsumptionAmount] = useState('')
  const [energyConsumptionPerHouseHold, setEnergyConsumptionPerHousehold] = useState(null)
  const [differenceInConsumption, setDifferenceInConsumption] = useState(null)

  useEffect(() => {
    if (regionData.length === 0) {
      return
    }

    const categoryData = regionData.filter(data => data.category === category)
    // console.log(categoryData)
    if (category === 'All homes') {
      setDifferenceInConsumption(calculateDifference(consumptionAmount,convertDataEnergy(categoryData[0].energy_consumption_per_household)))
      setEnergyConsumptionPerHousehold((convertDataEnergy(categoryData[0].energy_consumption_per_household)))
    }
  
  }, [regionData, category, consumptionAmount])

  const handleConsumptionAmountChange = (event) => {
    // console.log('handleConsumption', event.target.value)
    setConsumptionAmount(event.target.value)
  }

  const handleRegionChange = (event) => {
    setRegion(event.target.value)
    setRegionHelperText(`You selected ${event.target.value}`)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log('submitted')

    // console.log(event.target.elements.region.value)
    const regionValue = event.target.elements.region.value
    
    // console.log('getting')
    axios
      .get(`http://127.0.0.1:8000/energydata/${regionValue}`)
      .then(response => {
        setRegionData(response.data)
        setShowForm('none')
        setShowResults('block')
      })
  }

  const handleReset = () => {
    setShowForm('block')
    setShowResults('none')
    setConsumptionAmount('')
    setRegionData([])
    setRegion('')
    setCategory('All homes')
    setEnergyConsumptionPerHousehold(null)
    setDifferenceInConsumption(null)
    setRegionHelperText('Select a region in the U.S')
  }
  
  function convertDataEnergy(energyInBtu) {
    return (energyInBtu*dataBtuMultiple/btuPerKwh).toFixed(2)
  }

  function calculateDifference(consumed, data) {
    return (consumed - data).toFixed(2)
  }
  
  // console.log('rendered app')
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">   
          <Typography variant="h1" theme={theme} align="center">How Energy Efficient Are You?</Typography>
          <Box display={showForm}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={5} justifyContent="center" alignItems="center">

                <Grid item xs={12}>
                  <FormControl focused={true} fullWidth={true}>
                    <InputLabel>Annual energy consumption in kWh: </InputLabel>
                    <Input value={consumptionAmount} onChange={handleConsumptionAmountChange} type="number" name="annual-energy" id="annual-energy" required/>
                    <FormHelperText>Get your energy bills from the last 12 months and add up the amount of electricity you consumed.</FormHelperText>
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
            showResults={showResults} 
            handleReset={handleReset}
            differenceInConsumption={differenceInConsumption}
            energyConsumptionPerHouseHold={energyConsumptionPerHouseHold}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
