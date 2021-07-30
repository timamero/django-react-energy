import React from 'react'
import CategoryTabContent from './CategoryTabContent'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  }
}

const useTabStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}))

export default function ResultTabs({useStyles, inputAmount, isCompareConsumption, selection, handleSelectionChange, tabValue, handleTabChange, showResults, handleReset, handleCategoryChange, region, category, classification, subclassification, difference, energyPerHouseHold}) {
  const classes = useTabStyles()

  return (
    <div className={classes.root} style={{display: showResults}}>
      <AppBar position="static" color="default">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          onClick={handleCategoryChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="All homes" {...a11yProps(0)} />
          <Tab label="Census division" {...a11yProps(1)} />
          <Tab label="Census urban/rural classification" {...a11yProps(2)} />
          <Tab label="Metropolitan or micropolitan statistical area" {...a11yProps(3)} />
          <Tab label="Climate region" {...a11yProps(4)} />
          <Tab label="Housing unit type" {...a11yProps(5)} />
          <Tab label="Ownership of housing unit" {...a11yProps(6)} />
          <Tab label="Year of construction" {...a11yProps(7)} />
          <Tab label="Total square footage" {...a11yProps(8)} />
          <Tab label="Number of household members" {...a11yProps(9)} />
          <Tab label="2015 annual household income" {...a11yProps(10)} />
          <Tab label="Payment method for energy bills" {...a11yProps(11)} />
          <Tab label="Main heating fuel" {...a11yProps(12)} />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <CategoryTabContent 
          useStyles={useStyles}
          inputAmount={inputAmount}
          isCompareConsumption={isCompareConsumption}
          selection={selection}
          handleSelectionChange={handleSelectionChange}
          region={region}
          classification={classification}
          subclassification={subclassification}
          difference={difference}
          energyPerHouseHold={energyPerHouseHold}
          category={category}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <CategoryTabContent 
          useStyles={useStyles}
          inputAmount={inputAmount}
          isCompareConsumption={isCompareConsumption}
          selection={selection}
          handleSelectionChange={handleSelectionChange}
          region={region}
          classification={classification}
          subclassification={subclassification}
          difference={difference}
          energyPerHouseHold={energyPerHouseHold}
          category={category}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <CategoryTabContent 
          useStyles={useStyles}
          inputAmount={inputAmount}
          isCompareConsumption={isCompareConsumption}
          selection={selection}
          handleSelectionChange={handleSelectionChange}
          region={region}
          classification={classification}
          subclassification={subclassification}
          difference={difference}
          energyPerHouseHold={energyPerHouseHold}
          category={category}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <CategoryTabContent 
          useStyles={useStyles}
          inputAmount={inputAmount}
          isCompareConsumption={isCompareConsumption}
          selection={selection}
          handleSelectionChange={handleSelectionChange}
          region={region}
          classification={classification}
          subclassification={subclassification}
          difference={difference}
          energyPerHouseHold={energyPerHouseHold}
          category={category}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <CategoryTabContent 
          useStyles={useStyles}
          inputAmount={inputAmount}
          isCompareConsumption={isCompareConsumption}
          selection={selection}
          handleSelectionChange={handleSelectionChange}
          region={region}
          classification={classification}
          subclassification={subclassification}
          difference={difference}
          energyPerHouseHold={energyPerHouseHold}
          category={category}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={5}>
        <CategoryTabContent 
          useStyles={useStyles}
          inputAmount={inputAmount}
          isCompareConsumption={isCompareConsumption}
          selection={selection}
          handleSelectionChange={handleSelectionChange}
          region={region}
          classification={classification}
          subclassification={subclassification}
          difference={difference}
          energyPerHouseHold={energyPerHouseHold}
          category={category}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={6}>
        <CategoryTabContent 
          useStyles={useStyles}
          inputAmount={inputAmount}
          isCompareConsumption={isCompareConsumption}
          selection={selection}
          handleSelectionChange={handleSelectionChange}
          region={region}
          classification={classification}
          subclassification={subclassification}
          difference={difference}
          energyPerHouseHold={energyPerHouseHold}
          category={category}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={7}>
        <CategoryTabContent 
          useStyles={useStyles}
          inputAmount={inputAmount}
          isCompareConsumption={isCompareConsumption}
          selection={selection}
          handleSelectionChange={handleSelectionChange}
          region={region}
          classification={classification}
          subclassification={subclassification}
          difference={difference}
          energyPerHouseHold={energyPerHouseHold}
          category={category}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={8}>
        <CategoryTabContent 
          useStyles={useStyles}
          inputAmount={inputAmount}
          isCompareConsumption={isCompareConsumption}
          selection={selection}
          handleSelectionChange={handleSelectionChange}
          region={region}
          classification={classification}
          subclassification={subclassification}
          difference={difference}
          energyPerHouseHold={energyPerHouseHold}
          category={category}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={9}>
        <CategoryTabContent 
          useStyles={useStyles}
          inputAmount={inputAmount}
          isCompareConsumption={isCompareConsumption}
          selection={selection}
          handleSelectionChange={handleSelectionChange}
          region={region}
          classification={classification}
          subclassification={subclassification}
          difference={difference}
          energyPerHouseHold={energyPerHouseHold}
          category={category}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={10}>
        <CategoryTabContent 
          useStyles={useStyles}
          inputAmount={inputAmount}
          isCompareConsumption={isCompareConsumption}
          selection={selection}
          handleSelectionChange={handleSelectionChange}
          region={region}
          classification={classification}
          subclassification={subclassification}
          difference={difference}
          energyPerHouseHold={energyPerHouseHold}
          category={category}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={11}>
        <CategoryTabContent 
          useStyles={useStyles}
          inputAmount={inputAmount}
          isCompareConsumption={isCompareConsumption}
          selection={selection}
          handleSelectionChange={handleSelectionChange}
          region={region}
          classification={classification}
          subclassification={subclassification}
          difference={difference}
          energyPerHouseHold={energyPerHouseHold}
          category={category}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={12}>
        <CategoryTabContent 
          useStyles={useStyles}
          inputAmount={inputAmount}
          isCompareConsumption={isCompareConsumption}
          selection={selection}
          handleSelectionChange={handleSelectionChange}
          region={region}
          classification={classification}
          subclassification={subclassification}
          difference={difference}
          energyPerHouseHold={energyPerHouseHold}
          category={category}
        />
      </TabPanel>
      <Box m={2}>
        <Button onClick={handleReset} variant="outlined">
            Go Back
        </Button>
      </Box>
    </div>
  )
}
