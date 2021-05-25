import React from 'react';
import { Route, Link, Switch } from "react-router-dom";
import { MDBIcon } from "mdbreact";

import {json, checkStatus } from './utils.js'

import Chart from './CurrencyChart.js'
import ChanceDestination from './ChanceDestination.js'
import Portfolio from './Portfolio.js'
import Layout from './Layout.js'
import Graph from './Graph.js'
import Converter from './Converter.js'

import {currencyTracker} from './utils.js'
import _ from 'underscore';
import {debounce, throttle} from 'underscore';

function randomLocation(currencyRates, baseValue) {
  return _.sample(currencyRates, 3).map((destination) => {
    for(const key in destination) {
      let money = (destination[key] * baseValue).toFixed(2);
      let temp = key;
      for(const name in currencyTracker) {
        if(name === key) {
          temp = currencyTracker[name]
          break;
        }
      }
      return {
        currency: key,
        location: temp,
        money: money,
      }
    }
  })
}

class Dashboard extends React.Component {
  constructor(props) {
      super(props)
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
          },
          locations: [],
      }

      this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
      this.currencyChange = this.currencyChange.bind(this);
      this.throttleCurrencyChange= debounce(this.throttleCurrencyChange.bind(this), 1000)
  }

  handleCurrencyChange(conversion, currency) {
      const newSelections = {
          ...this.state.selections,
          [conversion]: currency,
      }
      this.setState({ selections: newSelections })
  }
  

  throttleCurrencyChange(direction, newConversion) {
    if(direction === "base") {
      this.setState({ conversion: newConversion })
    } else {
      this.setState({ conversion: newConversion })
    }
    this.setState({ locations: randomLocation(this.state.rates.currencyRates, this.state.conversion.baseValue) });
  }

  currencyChange(event) {
    if(event.target.id == 'base') {
      const convertValue = (event.target.value * (this.state.rates.goingRate === 0 ? 1 : this.state.rates.goingRate)).toFixed(2)
      document.getElementById('convertTo').value = convertValue;
      const newConversion = {
        baseValue: event.target.value,
        convertToValue: convertValue,
      }
      this.throttleCurrencyChange('base', newConversion)
    } else {
      const convertValue = (event.target.value / (this.state.rates.goingRate === 0 ? 1 : this.state.rates.goingRate)).toFixed(2)
      document.getElementById('base').value = convertValue;
      const newConversion = {
        baseValue: convertValue,
        convertToValue: event.target.value,
      }
      this.throttleCurrencyChange('convertTo', newConversion)
    }
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
      return randomLocation(this.state.rates.currencyRates, this.state.conversion.baseValue)
        
  }

  componentDidMount () {
      fetch("https://altexchangerateapi.herokuapp.com/latest?from=USD")
      .then(checkStatus)
      .then(json)
      .then((data) => {
        this.setState({ locations: this.currencyUpdate(data) });
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
  }

  // FIX YOUR FETCH REQUEST SO THAT IT DOESN'T FETCH WHEN THE CONVERTTO CURRENCY CHANGES, BUT THEN NECESSARY STATE PROPS DO
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

    return (
      <>
      <div id="websiteTitle">Travel Money</div>
        <Route path="/portfolio" component={Portfolio} />
        <Route exact path="/" render={() => 
            <Layout
                converter={<Converter 
                    stateProps={this.state} 
                    handleCurrencyChange={this.handleCurrencyChange}
                    currencyChange={this.currencyChange}  
                    />
                }
                chart={
                  <Chart stateProps={this.state} />
                } 
                graph={
                  <Graph />
                }
                destination={
                  <ChanceDestination baseValue={this.state.conversion.baseValue} locations={this.state.locations}/>
                } 
            />
            }
        />
      </>
    )
  }
}

export default Dashboard

/*
function Converter() {

    const { selections, rates, conversion } = this.state
    const wrong = false;
    return (
      <div className="container">
        <Title />
        <ConverterBox selections={selections} rates={rates} conversion={conversion} handleCurrencyChange={this.handleCurrencyChange} convertChange={this.currencyChangeConvertTo} baseChange={this.currencyChangeBase} currencyExchangeCalculator={this.currencyExchangeCalculator} />
        <Route path="/chart"  render={() => <Chart base={selections.base} rates={rates} baseValue={conversion.baseValue} />} />
        <Route path="/ChanceDestination" render={()=> <ChanceDestination currencyRates={rates.currencyRates} baseValue={conversion.baseValue} />} />
      </div>
    )

}

<Chart />
<Graph />
<ChanceDestination />
<Converter /> 


        return (
            <div>
            {(() => {
                return currencyRates.map((currency) => {
                    for(const key in currency) {
                       return <div key={key} >{key} at {currency[key]}</div>
                    }
                })
            })()}
            </div>
        )


*/