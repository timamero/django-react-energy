import React from 'react'
import theme from '../theme/theme'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { FormControl, RadioGroup, Radio, FormControlLabel } from '@material-ui/core'

const numberStyle = {
  fontWeight: 600,
  fontSize: '1.2rem'
}
  
const resultsContainer = {
  minHeight: '50vh',
}

const CategoryTabContent = ({useStyles, inputAmount, isCompareConsumption, selection, handleSelectionChange, region, classification, subclassification, difference, energyPerHouseHold, category}) => {
  const classes = useStyles()
  
  const currentClassification = selection ? classification.find(item => item.id === Number(selection)).name : null
  const currentClassificationIndex = selection ? classification.findIndex(item => item.id === Number(selection)) : null
  const currentSubclassification = selection ? subclassification[currentClassificationIndex] : null

  return (
    <Box style={resultsContainer}>
      {category !== 'All homes' ? (
        <div>
          <Typography 
            variant="h2" 
            theme={theme} 
            align="center"
          >
            {category} - {region} 
          </Typography>
          <FormControl 
            component="fieldset" 
            className={classes.alignItemsAndJustifyContent}
          >
            <RadioGroup 
              aria-label="division" 
              name="division" 
              value={selection} 
              onChange={handleSelectionChange} 
              style={{margin: 'auto'}} 
              required
            >
              {classification 
                && classification.map((item, index) => (
                  <FormControlLabel 
                    className={subclassification[index] 
                      ? classes.marginLeft 
                      : null} 
                    key={item.id} 
                    value={`${item.id}`} 
                    control={<Radio required={true}/>} 
                    label={`${subclassification[index] 
                      ? ''
                      : item.name} ${subclassification[index] 
                      ? `${subclassification[index]}` 
                      : ''}`} 
                  />
                )
                )
              }
            </RadioGroup>
          </FormControl>
        </div>               
      ) : null}
            
      {category === 'All homes' || selection ? (
        <Box className={classes.alignItemsAndJustifyContentCol}>
          <Typography 
            variant="h2" 
            theme={theme} 
            align="center"
          >
            Comparison Results for {currentClassification} {' '}
            {currentSubclassification 
              ? `- ${currentSubclassification}`
              : ''
            }
          </Typography>
          <Typography align="center">
            You {isCompareConsumption ? 'consumed' : 'spent'} {inputAmount} {isCompareConsumption ? 'kWh' : 'USD'}.
          </Typography>
          <Typography align="center">
            You {isCompareConsumption ? 'consumed' : 'spent'} {' '}
            <span
              style={numberStyle}
              className={difference > 0 ? classes.redText : classes.greenText}
            >
              {Math.abs(difference)} {isCompareConsumption ? 'kWh' : 'USD'}
            </span>
            {' '} {difference > 0 ? 'more' : 'less'} than the average.
          </Typography>
          <Typography align="center">
            The average energy {isCompareConsumption ? 'consumption' : 'expenditure'} was {energyPerHouseHold} {isCompareConsumption ? 'kWh' : 'USD'}.
          </Typography>
        </Box> 
      ) : null}
    </Box>
  )
}

export default CategoryTabContent