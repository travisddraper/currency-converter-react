import React from 'react';
import { Route, Link, Switch } from "react-router-dom";

import {json, checkStatus } from './utils.js'

import Chart from './CurrencyChart.js'
import ChanceDestination from './ChanceDestination.js'
import Portfolio from './Portfolio.js'
import Layout from './Layout.js'
import Page from './Page.js'
import Graph from './Graph.js'
import Converter from './Converter.js'

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

    render() {
        const {screenWidth } = this.props
        return (
            <>
            {screenWidth >= 768 
                ? <>
                    <Route path="/chart" render={() => 
                        <Page 
                            stateProps={this.state} 
                            handleCurrencyChange={this.handleCurrencyChange}
                            currencyChangeBase={this.currencyChangeBase}  
                            currencyChangeConvertTo={this.currencyChangeConvertTo}
                        >
                            <Chart stateProps={this.state} />
                        </Page>
                    }
                    />
                    <Route path="/graph" render={() => 
                        <Page 
                            stateProps={this.state} 
                            handleCurrencyChange={this.handleCurrencyChange}
                            currencyChangeBase={this.currencyChangeBase}  
                            currencyChangeConvertTo={this.currencyChangeConvertTo}
                        >
                            <Graph stateProps={this.state} />
                        </Page>
                    }
                    />
                    <Route path="/destination" render={() => 
                        <Page 
                            stateProps={this.state} 
                            handleCurrencyChange={this.handleCurrencyChange}
                            currencyChangeBase={this.currencyChangeBase}  
                            currencyChangeConvertTo={this.currencyChangeConvertTo}
                        >
                            <ChanceDestination stateProps={this.state} />
                        </Page>
                    }
                    />
                    <Route path="/portfolio" component={Portfolio}
                    />
                    <Route exact path="/" render={() => 
                        <Layout 
                            converter={<Converter 
                                stateProps={this.state} 
                                handleCurrencyChange={this.handleCurrencyChange}
                                currencyChangeBase={this.currencyChangeBase}  
                                currencyChangeConvertTo={this.currencyChangeConvertTo}
                                />
                            }
                            chart={
                                <Chart stateProps={this.state} />
                            } 
                            graph={
                                <Graph />
                            }
                            destination={
                                <ChanceDestination stateProps={this.state} />
                            } 
                        />
                        }
                    />
                 </>
                :
                    <Layout>
                        <Converter
                            stateProps={this.state} 
                            handleCurrencyChange={this.handleCurrencyChange}
                            currencyChangeBase={this.currencyChangeBase}  
                            currencyChangeConvertTo={this.currencyChangeConvertTo} 
                        /> 
                        <Chart stateProps={this.state} />
                        <Graph />
                        <ChanceDestination stateProps={this.state} />
                    </Layout>
            }
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