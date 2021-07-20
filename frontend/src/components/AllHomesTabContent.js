import React from 'react'
import theme from '../theme/theme'
import { useStyles, numberStyle } from '../styles/styles'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const AllHomesTabContent = ({differenceInConsumption, energyConsumptionPerHouseHold, region = "West"}) => {
    const classes = useStyles()
    
    return (
        <Box className={classes.alignItemsAndJustifyContentCol}>
            <Typography variant="h2" theme={theme} align="center">Comparison against all homes in the {region} </Typography>
            <Typography align="center">
            You used {' '}
                <span
                style={numberStyle}
                className={differenceInConsumption > 0 ? classes.redText : classes.greenText}
                >
                {Math.abs(differenceInConsumption)}kWh
                </span>
                {' '} {differenceInConsumption > 0 ? `more` : `less`} than the average.
            </Typography>
            <Typography align="center">The average energy consumption was {energyConsumptionPerHouseHold}kWh.</Typography>
        </Box>
    )
}

export default AllHomesTabContent;