import React, {useState, useEffect} from 'react'
import './App.css'
import getByRegion from './services/data'
import ResultTabs from './components/ResultTabs'
import theme from './theme/theme'
import { ThemeProvider } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { FormControl, FormLabel, FormGroup, InputLabel, Input, RadioGroup, Radio, FormControlLabel, FormHelperText } from '@material-ui/core'
import Switch from '@material-ui/core/Switch'
import FlashOnIcon from '@material-ui/icons/FlashOn'

const useStyles = makeStyles({
  centerText: {
    textAlign: 'center'
  },
  alignItemsAndJustifyContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignItemsAndJustifyContentCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redText: {
    color: '#DE2F2F'
  },
  greenText: {
    color: '#148021'
  },
  marginLeft: {
    marginLeft: 24
  },
  centerContainer: {
    margin: 'auto',
    width: '500px'
  },
  fullViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 3
  },
  loadingAnimation: {
    animation: 'loader 1s ease infinite'
  }
  ,
  loadingAnimation2: {
    animation: 'loader 2.5s ease infinite'
  }
  ,
  loadingAnimation3: {
    animation: 'loader 5s ease infinite'
  }
})

// const css = window.document.styleSheets[0]
// css.insertRule(`
// @keyframes loader {
//   0%   { opacity: 0;     }
//   50%  { opacity: 0.5; }
//   100% { opacity: 1%; }
// }`, css.cssRules.length)

const App = () => {
  const classes = useStyles()

  const btuPerKwh = 3412.14
  const dataBtuMultiple = 1000000

  const [showForm, setShowForm] = useState('block')
  const [showResults, setShowResults] = useState('none')
  const [loading, setLoading] = useState(false)
  
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
  const [tabValue, setTabValue] = React.useState(0)

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
        return {'id': data.id, 'name': data.classification}
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
  }, [regionData, category, inputAmount, tabValue, selection, isCompareConsumption])

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
    setLoading(true)
    getByRegion(regionValue).then(energyData => {
      setRegionData(energyData)
      setShowForm('none')
      setShowResults('block')
      setLoading(false)
    })
  }

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue)
  }

  const handleCompareConsumptionChange = () => {
    setIsCompareConsumption(!isCompareConsumption)
  }

  const handleReset = () => {
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

  const TypeSwitch = withStyles({
    switchBase: {
      color: '#B5F3BC',
    },
    checked: {},
    track: {
      border: '1px solid #7B947E',
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: '#2FDE43',
    },
  })(Switch)
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">     
          <Typography 
            variant="h1" 
            theme={theme} 
            align="center"
          >
            How Energy Efficient Are You?
          </Typography>       
          <Box display={showForm}>
            <Box style={{maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto'}}> 
              <FormGroup>
                <FormControlLabel
                  control={<TypeSwitch 
                    checked={isCompareConsumption}
                    onChange={handleCompareConsumptionChange}
                  />}
                  label={isCompareConsumption? 'Compare energy consumption in kWh': 'Compare energy expenditure in USD'}
                />
              </FormGroup>
            </Box> 
            <form onSubmit={handleSubmit}>
              <Grid container spacing={5} justifyContent="center" alignItems="center">

                <Grid item xs={12}>
                  <Box className={classes.centerContainer}>
                    <FormControl focused={true} fullWidth={true}>
                      <InputLabel>
                        Annual energy {isCompareConsumption ? 'consumption in kWh: ': 'expenditure in USD'}
                      </InputLabel>
                      <Input 
                        value={inputAmount} 
                        onChange={handleinputAmountChange} 
                        type="number" 
                        name="annual-energy" 
                        id="annual-energy" 
                        required/
                      >
                      <FormHelperText>
                        Get your energy bills from the last 12 months and add up the amount of electricity you {' '}
                        {isCompareConsumption ? 'consumed' : 'paid for'}.
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <FormControl component="fieldset" className={classes.alignItemsAndJustifyContent}>
                    <FormLabel component="legend" className={classes.centerText}>Region</FormLabel>
                    <RadioGroup aria-label="region" name="region" value={region} onChange={handleRegionChange} required>
                      <FormControlLabel value="Northeast" control={<Radio required={true}/>} label="Northeast" />
                      <FormControlLabel value="Midwest" control={<Radio required={true}/>} label="Midwest" />
                      <FormControlLabel value="South" control={<Radio required={true}/>} label="South" />
                      <FormControlLabel value="West" control={<Radio required={true}/>} label="West" />
                    </RadioGroup>
                    <FormHelperText className={classes.centerText}>{regionHelperText}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.alignItemsAndJustifyContent}>
                  <Button variant="contained" color="primary" type="submit" style={{textAlign: 'center'}}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>    
          </Box>
          {loading 
            ? (
              <Box className={classes.fullViewContainer}>
                <FlashOnIcon className={classes.loadingAnimation} />
                <FlashOnIcon className={classes.loadingAnimation2} />
                <FlashOnIcon className={classes.loadingAnimation3} />
                <Typography>Loading</Typography>
              </Box> 
            )
            : null }
          <ResultTabs 
            useStyles={useStyles}
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

          <Box>
            <footer>
              <Typography variant="body2" style={{textAlign:'center'}} >
                The data used to compare energy consumption and expenditure is from the <a href="https://www.eia.gov/consumption/residential/data/2015/index.php?view=consumption#summary" target="_blank" rel="noreferrer">2015 Residential Energy Consumption Survey</a>.
              </Typography>
            </footer>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default App
