import React from 'react';
import { Route, Link } from "react-router-dom";

import { MDBIcon } from "mdbreact";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

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
  const {title, rateNames, onChange, direction, changeFunction, conversion } = props

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



function Converter(props) {

    const { selections, rates, conversion } = props.stateProps
    const { handleCurrencyChange, currencyChangeBase, currencyChangeConvertTo } = props;


    return (
      <div className="container">
        <ConverterBox selections={selections} rates={rates} conversion={conversion} handleCurrencyChange={handleCurrencyChange} convertChange={currencyChangeConvertTo} baseChange={currencyChangeBase} />
      </div>
    )

} 



export default Converter

/*<Route path="/chart"  render={() => <Chart base={selections.base} rates={rates} baseValue={conversion.baseValue} />} />*/

/*
        <Route
          path ="/chart"
          component={
            wrong 
            ? () => <div className="container">
                      <div>it was true</div>
                    </div>
            : () => <div className="container 2">
                      <div>It was false!</div>
                    </div>
          } 
        />
*/