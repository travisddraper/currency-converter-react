import React from 'react';
import { Route, Link } from "react-router-dom";

import {json, checkStatus } from './utils.js'

import Chart from './CurrencyChart.js'
import ChanceDestination from './ChanceDestination.js'

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
}