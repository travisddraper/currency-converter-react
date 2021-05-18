import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownType from 'react-bootstrap/Dropdown';

import {json, checkStatus } from './utils.js'

import Chart from './CurrencyChart.js'
import ChanceDestination from './ChanceDestination.js'


const Title = () =>  <h1 id="pageTitle">Travel Money</h1> 


const DropdownCurrency = (props) => {
  const {rateNames, onChange, direction, title} = props;

  return (
    <DropdownButton 
      id="currencyButton" 
      variant="Secondary"
      size="sm"
      title={title}   
    >
      {(() => {
        return rateNames.map((currency) => {
          return <Dropdown.Item key={currency} onSelect={() => {onChange(direction, currency)} }>{currency}</Dropdown.Item>
        })
      })()}
    </DropdownButton>
  );
}

const ConversionSection = (props) => {
  const {title, rateNames, onChange, direction, goingRate, changeFunction, conversion } = props

  return (
    <>
    {direction === "base" 
    ? (
      <div className="col-12 col-sm-5 conversionBase conversion">
        <DropdownCurrency className="mr-2" title={title} rateNames={rateNames} onChange={onChange} direction={direction} />
        <input
          placeholder={`00.00 ${title}`}
          id={direction}
          type="number"
          onChange={changeFunction}
          value={conversion}
          className="ml-2 ml-sm-0"
        >  
        </input>
      </div>
      )
    : (
      <div className="col-12 col-sm-5 conversionTo conversion">
        <input
          placeholder={`00.00 ${title}`}
          id={direction}
          type="number"
          onChange={changeFunction}
          value={conversion}
          className="mr-2 mr-sm-0"
        >  
        </input>
        <DropdownCurrency className="mr-2" title={title} rateNames={rateNames} onChange={onChange} direction={direction} />
      </div>
      )
  }
  </>
  )
}


const CurrencyForm = (props) => {
  const { base, convertTo } = props.selections
  const { rates, handleCurrencyChange, convertChange, baseChange, conversion } = props

  const rateNames = rates.currencyRates.map((currency) => {
    for(const key in currency) { 
      return key
    }
  })

  return (
    <form className="row formRow px-2">
      <ConversionSection title={base} rateNames={rateNames} conversion={conversion.baseValue} goingRate={rates.goingRate} onChange={handleCurrencyChange} changeFunction={baseChange} direction="base" />
      <div className="col-12 col-sm-1 mt-sm-2 mt-md-0 conversionArrow arrow">
        <MDBIcon  icon="angle-right" size="2x" />
      </div>
      <ConversionSection title={convertTo} rateNames={rateNames} conversion={conversion.convertToValue} goingRate={rates.goingRate} onChange={handleCurrencyChange} changeFunction={convertChange}  direction="convertTo" />
    </form>
  )
}

const ConverterBox = (props) => {

  const { selections, rates, baseChange, convertChange, handleCurrencyChange, conversion } = props;

  return (
    <div className="currencyCoverter box">
      <div className="innerBox">
        <div className="row currencyRow">
          <button className="topLeftButton">
            <Link to="/">Currency Converter</Link>
          </button>
          <button className="middleButton">
            <Link to="/chart">Currency Chart</Link>
          </button>
          <button className="topRightButton">
            <Link to="/ChanceDestination">Chance Destinations</Link>
          </button>
        </div>
        <CurrencyForm selections={selections} rates={rates} conversion={conversion} handleCurrencyChange={handleCurrencyChange} convertChange={convertChange} baseChange={baseChange} />
      </div>
    </div>
  )
}



class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      rates: {
        goingRate: 0,
        currencyRates: [],
      },
      selections: {
        base: 'USD',
        convertTo: 'EUR',
      },
      conversion: {
        baseValue: '',
        convertToValue: '',
      }
    }
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.currencyChangeBase = this.currencyChangeBase.bind(this);
    this.currencyChangeConvertTo = this.currencyChangeConvertTo.bind(this);
  }

    
  handleCurrencyChange(conversion, currency) {
    const newSelections = {
        ...this.state.selections,
        [conversion]: currency,
    }
    this.setState({ selections: newSelections })
  }

  currencyChangeBase(event) {
    const convertValue = (event.target.value * (this.state.rates.goingRate === 0 ? 1 : this.state.rates.goingRate)).toFixed(2)
    this.setState({ 
      conversion: {
        baseValue: event.target.value,
        convertToValue: convertValue, 
      }
    })
  }

  currencyChangeConvertTo(event) {
    const convertValue = (event.target.value / (this.state.rates.goingRate === 0 ? 1 : this.state.rates.goingRate)).toFixed(2)
    this.setState({ 
      conversion: {
        baseValue: convertValue,
        convertToValue: event.target.value, 
      }
    })
  }

  currencyUpdate(data) {
    let goingRate = 0;
    let newRates = [];
    const newSelections = {...this.state.selections, base: data.base }
    let base = document.getElementById('base')
    let conversion = document.getElementById('convertTo')

    for (const property in data.rates) {
      if(this.state.selections.convertTo === property) {
        goingRate = data.rates[property]
      }
      newRates.push( {[property]: data.rates[property]} )
    }

    this.setState({ 
      rates: {
        goingRate: goingRate,
        currencyRates: newRates,
      },
      selections: newSelections,
    })
    
    if(conversion.value) {
      conversion.value = (base.value * goingRate).toFixed(2)
    }
    
  }

  componentDidMount () {
    fetch("https://altexchangerateapi.herokuapp.com/latest?from=USD")
    .then(checkStatus)
    .then(json)
    .then((data) => {

      this.currencyUpdate(data);
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selections.base !== this.state.selections.base || prevState.selections.convertTo !== this.state.selections.convertTo) {
      fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${this.state.selections.base}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        this.currencyUpdate(data);
      })
    }
  }

  render() {
    const { selections, rates, conversion } = this.state
    
    return (
      <>
      <div className="container">
      <Title />
      <ConverterBox selections={selections} rates={rates} conversion={conversion} handleCurrencyChange={this.handleCurrencyChange} convertChange={this.currencyChangeConvertTo} baseChange={this.currencyChangeBase} currencyExchangeCalculator={this.currencyExchangeCalculator} />
        <Route path="/chart"  render={() => <Chart base={selections.base} rates={rates} baseValue={conversion.baseValue} />} />
        <Route path="/ChanceDestination" render={()=> <ChanceDestination rates={rates} baseValue={conversion.baseValue} />} />
      </div>
    </>
    )
  }
}



export default Home