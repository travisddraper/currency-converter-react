import React from 'react';
import { MDBIcon } from "mdbreact";
import getSymbolFromCurrency from 'currency-symbol-map'
import {json, checkStatus } from './utils.js'
import { text } from '@fortawesome/fontawesome-svg-core';



const Title = (props) => <h1 className={props.location}><span className="textRemove">Chance</span> <span className="fontColorChoice px-2">Destinations</span><br /> <span className="textRemove">with your Money!</span></h1>
//col-11 col-md-10 col-lg-9 col-xl-12
const Destination = (props) => {
  const {destination, money, currency } = props
   return (
    <div className="info row">
    <div className="destination col-xl-12">
      
      <p className="travelHeader">
        <MDBIcon className="mb-3 pr-2 arrow" icon="angle-right" />
        Travel to <a className="travel" href={`https://en.wikipedia.org/wiki/${destination.replace(/ /, '_')}`} rel="noreferrer" target="_blank">{destination}</a> with {(parseInt(money)).toLocaleString()}<span className="travel">{getSymbolFromCurrency(currency)}</span>!
      </p>
      <div id={destination} className="travelBlurb"></div>
    </div>
    </div>
  )
}

class ChanceDestinations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
    }
  }

    componentDidUpdate() {
      if(this.props.baseValue){
        const destinations = this.props.locations
        const reg = /\(listen\)/g
        destinations.forEach((location) => {
          let locationName = location.location;
          fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${locationName.replace(" ", "%20")}&origin=*`)
          .then(checkStatus)
          .then(json)
          .then((data) => {
            let wikiObject = data.query.pages
            for(const key in wikiObject) {
              let textBlurb = wikiObject[key].extract.slice(0, Math.floor(wikiObject[key].extract.length/3.5)).replace(reg, ' ');
              document.getElementById(locationName).innerHTML=(textBlurb + '<span class="ellipsis">. . .</span>')
            }
          })
          .catch((error) => {
            //console.log('locationName', document.getElementById(locationName));
            console.log(error)
          })
        })
      }

    }
      

  render() {
    const {locations, baseValue} = this.props

    return (
      <div id="destinations" className="functionContainer">
      <Title location="title destinationTitle" />
        <div className="destinationRow row">
            {(() => {
              if(baseValue === '') {
                return <div className="warning warningFix">Add some cash above, and let's check out those travel locations!</div>
              }
              return locations.map((travel) => {
                return <Destination key={travel.location} destination={travel.location} money={travel.money} currency={travel.currency} />
              })
            })()}
        </div>
      </div>
  
    )
  }

}

export default ChanceDestinations;