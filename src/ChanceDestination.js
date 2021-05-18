import React from 'react';
import { MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import { Redirect } from 'react-router';
import {currencyTracker} from './utils.js'
import getSymbolFromCurrency from 'currency-symbol-map'

const Title = (props) => <h1 className={props.location}><span className="textRemove">Chance</span> <span style={{color: "red"}}>Destinations</span><br /> <span className="textRemove">with your Money!</span></h1>

function Destination(props) {
  const {destination, money, currency } = props

   return (
    <div className="destination col-4">
      <MDBIcon className="d-inline mb-3 pr-2 arrow" icon="angle-right" />
      <p>
        Travel to <a className="travel" href={`https://en.wikipedia.org/wiki/${destination}`} target="_blank">{destination.replace(/_/g, ' ')}</a> and have {(parseInt(money)).toLocaleString()}<span className="travel">{getSymbolFromCurrency(currency)}</span>!
      </p>
    </div>
  )
}

function randomLocation(currencyRates, goingRate, baseValue) {
  let locations = [];
  for(let i=1; i<=3; i++) {
    let pick = currencyRates[Math.floor(Math.random() * (currencyRates.length))];
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
  }
  return locations
}


class ChanceDestinations extends React.Component {
  constructor(props) {
    super(props);
  }

    render() {
      const { rates, baseValue } = this.props;
      const { goingRate, currencyRates } = rates
      const locations = randomLocation(currencyRates, goingRate, baseValue)
      return (
        <div className="chanceDestination">
          <Title location="Bang1 destinationTitle" />
          <div className="destinationRow row box2">
            <div className="col-1 col-md-2 col-lg-3 col-xl-4 v1">
            </div>
            <div className="col-11 col-md-10 col-lg-9 col-xl-8 info row">
            {(() => {
              return locations.map((travel) => {
                return <Destination key={travel.location }destination={travel.location} money={travel.money} currency={travel.currency} />
              })
            })()}
            </div>
          </div>
        </div>
      )
    }
  
}

export default ChanceDestinations;