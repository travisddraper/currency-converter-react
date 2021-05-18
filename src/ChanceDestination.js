import React from 'react';
import { MDBIcon } from "mdbreact";
import {currencyTracker} from './utils.js'
import getSymbolFromCurrency from 'currency-symbol-map'


function randomizer(currencyRates) {
  if(currencyRates.length > 0) {
    let values = [];

    function randomChecker() {
      let temp = Math.floor(Math.random() * (currencyRates.length))

      if(values.length >= 1 && values.indexOf(temp) !== -1) {
        return randomChecker()
      } 
      values.push(temp) 
      }
  
      
    for(let i=1;i<=3;i++) {
      randomChecker(values);
    }
    return values
  }
  return []
}

function randomLocation(currencyRates, baseValue) {
  let locations = [];
  let values = randomizer(currencyRates);

  values.forEach((number) => {
    let pick = currencyRates[number];
    for(const key in pick) {
      let money = (pick[key] * baseValue).toFixed(2);
      let temp = key;
      for(const location in currencyTracker) {
        if (location === key) {
          temp = currencyTracker[location]
        }
      }
      locations.push({
        currency: key,
        location: temp,
        money: money,
      })
    }
  })  
  return locations
}

const Title = (props) => <h1 className={props.location}><span className="textRemove">Chance</span> <span style={{color: "red"}}>Destinations</span><br /> <span className="textRemove">with your Money!</span></h1>

const Destination = (props) => {
  const {destination, money, currency } = props

   return (
    <div className="destination col-4">
      <MDBIcon className="d-inline mb-3 pr-2 arrow" icon="angle-right" />
      <p>
        Travel to <a className="travel" href={`https://en.wikipedia.org/wiki/${destination}`} rel="noreferrer" target="_blank">{destination.replace(/_/g, ' ')}</a> and have {(parseInt(money)).toLocaleString()}<span className="travel">{getSymbolFromCurrency(currency)}</span>!
      </p>
    </div>
  )
}

function ChanceDestinations(props) {

  const { currencyRates, baseValue } = props;
  const locations = randomLocation(currencyRates, baseValue)
  
  return (
    <div className="chanceDestination">
      <Title location="destinationTitle" />
      <div className="destinationRow row box2">
        <div className="col-1 col-md-2 col-lg-3 col-xl-4 v1"></div>
        <div className="col-11 col-md-10 col-lg-9 col-xl-8 info row">
          {(() => {
            if(baseValue === '') {
              return <div className="destination warning">Add some cash above, and let's check out those travel locations!</div>
            }
            return locations.map((travel) => {
              return <Destination key={travel.location} destination={travel.location} money={travel.money} currency={travel.currency} />
            })
          })()}
        </div>
      </div>
    </div>
  )
}

export default ChanceDestinations;