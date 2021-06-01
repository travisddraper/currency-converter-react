import React from 'react';
import { MDBIcon } from "mdbreact";
import {json, checkStatus } from './utils.js'
import {currencyTracker} from './utils.js'
import _ from 'underscore';


const Title = () => <h1 className="title destinationTitle"><span className="textRemove">Chance</span> <span className="fontColorChoice px-1">Destinations</span></h1>

const Destination = (props) => {
  const {destination, money, currency, text } = props

   return (
    <div className="info row">
    <div className="destination col-xl-12">
      
      <p className="travelHeader">
        <MDBIcon className="mb-3 pr-2 arrow" icon="angle-right" />
        Travel to <a className="travel" href={`https://en.wikipedia.org/wiki/${destination.replace(/ /, '_')}`} rel="noreferrer" target="_blank">{destination}</a> with {(parseInt(money)).toLocaleString()} <span className="travel">{currency}</span>!
      </p>
      <div id={destination} className="travelBlurb">{text}</div>
    </div>
    </div>
  )
}

function ChanceDestinations(props) {
  
  const {destinations, locations} = props;

  return (
    <div id="destinations" className="functionContainer">
      <Title location="title destinationTitle" />
      <div className="destinationRow row">
        {locations.map((travel) => {
          const text = destinations[travel.location]
            return <Destination text={text} key={travel.location} destination={travel.location} money={travel.money} currency={travel.currency} />
          })
        }
      </div>
    </div>
  )
}

export default ChanceDestinations;