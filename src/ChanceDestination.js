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


class ChanceDestinations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destinations: {},
      locations: [],
    } 
  }

  fetchBlurbs() {
    const locations = randomLocation( this.props.rates, this.props.baseValue )
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
          locations: locations,
          destinations: destinations,
        })
      })
      .catch((error) => {
        console.log(error)
      })
    })
  }

  componentDidMount() {
    this.fetchBlurbs();
  }
  componentDidUpdate(prevProps) {
    if(prevProps.baseValue !== this.props.baseValue || prevProps.baseCurrency !== this.props.baseCurrency){
      this.fetchBlurbs();
    }
  } 
  
  render() {
    const {destinations} = this.state
  
    return (
      <div id="destinations" className="functionContainer">
      <Title location="title destinationTitle" />
        <div className="destinationRow row">
            {this.state.locations.map((travel) => {
                const text = destinations[travel.location]
                return <Destination text={text} key={travel.location} destination={travel.location} money={travel.money} currency={travel.currency} />
              })
            }
        </div>
      </div>
    )
  }
}

export default ChanceDestinations;