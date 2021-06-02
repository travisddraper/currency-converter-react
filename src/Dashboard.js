import React from 'react';
import { Route } from "react-router-dom";

import {json, checkStatus } from './utils.js'

import Chart from './CurrencyChart.js'
import ChanceDestination from './ChanceDestination.js'
import Portfolio from './Portfolio.js'
import Layout from './Layout.js'
import Graph from './Graph.js'
import Converter from './Converter.js'
import {currencyTracker} from './utils.js'

import _ from 'underscore';
import {debounce} from 'underscore';


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
          destinations: {},
          locations: [],
          chart: {
            chartDat: '',
            chartLabels: '',
            chartTitle: '',
          }
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

      } else {
        this.fetchGraph(this.state.selections.base, currency);
        let goingRate = 0;
        this.state.rates.currencyRates.forEach((pair) => {
          for(const key in pair) {
            if(key === currency) {
              goingRate = pair[key]
              this.setState({ 
                rates: {
                  goingRate,
                  currencyRates: this.state.rates.currencyRates,
                }
              })
            }
          }
        })
        document.getElementById('convertTo').value = ((goingRate * document.getElementById('base').value)).toFixed(2);
      }
  }
  

  throttleCurrencyChange(newConversion) {
    this.setState({ conversion: newConversion })
    this.fetchBlurbs();
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
        this.fetchGraph(currency, this.state.selections.convertTo)
        if(this.state.conversion.baseValue) {
          this.fetchBlurbs(); 
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
  }

  fetchBlurbs() {
    const locations = randomLocation( this.state.rates.currencyRates, this.state.conversion.baseValue )
    const reg = /\(listen\)/g
    const destinations = {};

    locations.forEach((location) => {
      let locationName = location.location;
      fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${locationName.replace(" ", "%20")}&origin=*`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        const wikiObject = data.query.pages
        for(const key in wikiObject) {
          const textBlurb = wikiObject[key].extract.slice(0, Math.floor(wikiObject[key].extract.length/3.5)).replace(reg, ' ');
          destinations[locationName] = textBlurb
        }
        
        this.setState ({ 
          locations,
          destinations,
        })
      })
      .catch((error) => {
        console.log(error)
      })
    })
  }

  fetchGraph(base, convert) {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    fetch(`https://altexchangerateapi.herokuapp.com/${startDate}..${endDate}?from=${base}&to=${convert}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      const chartLabels = Object.keys(data.rates);
      const chartData = Object.values(data.rates).map(rate => rate[convert] );
      const chartTitle = `${base}/${convert}`;
      this.setState({
        chart: {
          chartLabels,
          chartData,
          chartTitle,
        }
      })
    })
  }

  componentDidMount () {
    this.fetchLatest(this.state.selections.base);
  }

  render() {

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
                  <Graph chart={this.state.chart} titles={this.state.selections} />
                }
                destination={
                  <ChanceDestination locations={this.state.locations} destinations={this.state.destinations} />
                } 
            />
            }
        />
      </>
    )
  }
}

export default Dashboard