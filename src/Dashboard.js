import React from 'react';
import { Route } from "react-router-dom";

import {json, checkStatus } from './utils.js'

import Chart from './CurrencyChart.js'
import ChanceDestination from './ChanceDestination.js'
import Portfolio from './Portfolio.js'
import Layout from './Layout.js'
import Graph from './Graph.js'
import Converter from './Converter.js'


import _ from 'underscore';
import {debounce} from 'underscore';

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

  handleCurrencyChange(direction, currency) {
      const newSelections = {
          ...this.state.selections,
          [direction]: currency,
      }
      this.setState({ selections: newSelections })
      if(direction === 'base'){
        this.fetchLatest(currency);
      }
  }
  

  throttleCurrencyChange(newConversion) {
    this.setState({ conversion: newConversion })
  }

  currencyChange(event) {
    if(event.target.id === 'base') {
      const convertValue = (event.target.value * (this.state.rates.goingRate === 0 ? 1 : this.state.rates.goingRate)).toFixed(2)
      document.getElementById('convertTo').value = convertValue;
      const newConversion = {
        baseValue: event.target.value,
        convertToValue: convertValue,
      }
      this.throttleCurrencyChange(newConversion)
    } else {
      const convertValue = (event.target.value / (this.state.rates.goingRate === 0 ? 1 : this.state.rates.goingRate)).toFixed(2)
      document.getElementById('base').value = convertValue;
      const newConversion = {
        baseValue: convertValue,
        convertToValue: event.target.value,
      }
      this.throttleCurrencyChange(newConversion)
    }
  }

  currencyUpdate(data) {
      let goingRate = 0;
      let newRates = [];
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
        }
      })
      if(conversion.value) {
        conversion.value = (base.value * goingRate).toFixed(2)
      }
        
  }

  fetchLatest(currency) {
    fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${currency}`)
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

  componentDidMount () {
    this.fetchLatest(this.state.selections.base);
  }

  render() {
    const currencyRates = this.state.rates.currencyRates;

    return (
      <>
        <Route path="/portfolio" component={Portfolio} />
        <Route exact path="/" render={() => 
            <Layout baseValue={this.state.conversion.baseValue} convertToValue={this.state.conversion.convertToValue} rate={this.state.rates.goingRate}
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
                  <ChanceDestination baseValue={this.state.conversion.baseValue} rates={currencyRates} baseCurrency={this.state.selections.base} />
                } 
            />
            }
        />
      </>
    )
  }
}

export default Dashboard