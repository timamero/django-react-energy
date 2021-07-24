// Material-UI Styles
import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
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
      color: 'red'
    },
    greenText: {
      color: 'green'
    },
    marginLeft: {
      marginLeft: 24
    }
  })

// Style for the displayed calculated difference in consumption/expenditure
export const numberStyle = {
    fontWeight: 600,
    fontSize: '1.2rem'
}

export const resultsContainer = {
  minHeight: '50vh',
}
