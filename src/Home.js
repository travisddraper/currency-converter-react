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
  const {title, rateNames, onChange, direction, conversion} = props

  return (
    <div className="col-5 conversion">
    <DropdownCurrency className="mr-2" title={title} rateNames={rateNames} onChange={onChange} direction={direction} />
      <input
          placeholder={`00.00 ${conversion}`}
          className={direction}
          type="number"
      >  
      </input>
    </div>
  )
}

const CurrencyForm = (props) => {
  const { base, convertTo } = props.selections
  const { rates, handleCurrencyChange } = props

  const rateNames = rates.map((currency) => {
    for(const key in currency) { return key; }
  })

  return (
    <form className="row formRow px-2">
      <ConversionSection title={base} rateNames={rateNames} onChange={handleCurrencyChange} direction="base" conversion={base} />
      <div className="col-1 arrow">
        <MDBIcon className="" icon="angle-right" size="3x" />
      </div>
      <ConversionSection title={convertTo} rateNames={rateNames} onChange={handleCurrencyChange} direction="convertTo" conversion={convertTo} />
    </form>
  )
}

const ConverterBox = (props) => {
  const { selections, rates, handleCurrencyChange } = props;

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
        <CurrencyForm selections={selections} rates={rates} handleCurrencyChange={handleCurrencyChange} />
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
      }
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



  componentDidMount () {
    fetch("https://altexchangerateapi.herokuapp.com/latest")
    .then(checkStatus)
    .then(json)
    .then((data) => {
      for (const property in data.rates) {
        this.setState({rates: this.state.rates.concat({[property]: data.rates[property]}) })
      }

      const newSelections = {...this.state.selections, base: data.base }

      this.setState({ selections: newSelections })
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selections.base !== this.state.selections.base) {
      fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${this.state.selections.base}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        const newSelections = {...this.state.selections, base: data.base }
        let newRates = [];

        for (const property in data.rates) {
          newRates.push({[property]: data.rates[property]})
        }
        this.setState({ 
          selections: newSelections,
          rates: newRates,
         })
         console.log(this.state);
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
    }
  }

  render() {
    const { selections, rates } = this.state
    return (
      <>
      <Title />
      <div className="container">
        <ConverterBox selections={selections} rates={rates} handleCurrencyChange={this.handleCurrencyChange} />
        <Route path="/chart"  render={() => <Chart base={selections.base} rates={rates} />} />
        <Route path="/chart/bangforbuck" render={()=> <BangforBuck />} />
      </div>
    </>
    )
  }
}



export default Home