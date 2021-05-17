import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownType from 'react-bootstrap/Dropdown';

import {json, checkStatus } from './utils.js'

import Chart from './CurrencyChart.js'
import BangforBuck from './BangforBuck.js'


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
  const {title, rateNames, onChange, direction, conversion, goingRate} = props

  //function conversionCalculator(direction, goingRate)

  return (
    <div className="col-5 conversion">
      {direction === 'base' 
        ? (
          <>  
            <DropdownCurrency className="mr-2" title={title} rateNames={rateNames} onChange={onChange} direction={direction} />
            <input
              placeholder={`00.00 ${conversion}`}
              id={direction}
              type="number"
            >  
            </input>
          </>
          )
        : (
          <>
            <input
              placeholder={`00.00 ${conversion}`}
              id={direction}
              type="number"
            >  
            </input>
            <DropdownCurrency className="mr-2" title={title} rateNames={rateNames} onChange={onChange} direction={direction} />
          </>
          )
      }
    </div>
  )
}

const CurrencyForm = (props) => {
  const { base, convertTo } = props.selections
  const { rates, handleCurrencyChange, goingRate } = props

  const rateNames = rates.map((currency) => {
    for(const key in currency) { return key; }
  })

  return (
    <form className="row formRow px-2">
      <ConversionSection title={base} rateNames={rateNames} goingRate={goingRate} onChange={handleCurrencyChange} direction="base" conversion={base} />
      <div className="col-1 arrow">
        <MDBIcon className="" icon="angle-right" size="3x" />
      </div>
      <ConversionSection title={convertTo} rateNames={rateNames} goingRate={goingRate} onChange={handleCurrencyChange} direction="convertTo" conversion={convertTo} />
    </form>
  )
}

const ConverterBox = (props) => {
  const { selections, rates, handleCurrencyChange, goingRate } = props;

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
            <Link to="/chart/bangforbuck">Bang for Your Buck</Link>
          </button>
        </div>
        <CurrencyForm selections={selections} goingRate={goingRate} rates={rates} handleCurrencyChange={handleCurrencyChange} />
      </div>
    </div>
  )
}



class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      rates: [],
      selections: {
        base: 'EUR',
        convertTo: 'USD',
      },
      goingRate: 0,
    }
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
  }

    
  handleCurrencyChange(conversion, currency) {
    const newSelections = {
        ...this.state.selections,
        [conversion]: currency,
    }
  
    this.setState({ selections: newSelections })
  }

  currencyUpdate(data) {
    let goingRate = 0;
    let newRates = [];
    const newSelections = {...this.state.selections, base: data.base }

    for (const property in data.rates) {
      if(this.state.selections.convertTo === property) {
        goingRate = data.rates[property]
      }
      newRates.push( {[property]: data.rates[property]} )
    }

    this.setState({ 
      goingRate: goingRate,
      rates: newRates,
      selections: newSelections,
    })
  }

  componentDidMount () {
    fetch("https://altexchangerateapi.herokuapp.com/latest")
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
    const { selections, rates, goingRate } = this.state
    return (
      <>
      <Title />
      <div className="container">
        <ConverterBox selections={selections} goingRate={goingRate} rates={rates} handleCurrencyChange={this.handleCurrencyChange} />
        <Route path="/chart"  render={() => <Chart base={selections.base} rates={rates} />} />
        <Route path="/chart/bangforbuck" render={()=> <BangforBuck />} />
      </div>
    </>
    )
  }
}



export default Home