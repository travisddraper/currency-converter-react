import React from 'react';
import { MDBIcon } from "mdbreact";
import getSymbolFromCurrency from 'currency-symbol-map'
import {json, checkStatus } from './utils.js'



const Title = (props) => <h1 className={props.location}><span className="textRemove">Chance</span> <span className="fontColorChoice">Destinations</span><br /> <span className="textRemove">with your Money!</span></h1>

const Destination = (props) => {
  const {destination, money, currency } = props

   return (
    <div className="destination col-4">
      <MDBIcon className="d-inline mb-3 pr-2 arrow" icon="angle-right" />
      <p>
        Travel to <a className="travel" href={`https://en.wikipedia.org/wiki/${destination}`} rel="noreferrer" target="_blank">{destination.replace(/_/g, ' ')}</a> with {(parseInt(money)).toLocaleString()}<span className="travel">{getSymbolFromCurrency(currency)}</span>!
      </p>
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
        destinations.forEach((location) => {
          let locationName = location.location.replace("_", '%20')
          fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${locationName}&origin=*`)
          .then(checkStatus)
          .then(json)
          .then((data) => {
            let wikiObject = data.query.pages
            for(const key in wikiObject) {
              let div = document.createElement("div");
              div.append(wikiObject[key].extract)
              document.getElementsByClassName('destination')[0].append(div);
            }
          })
          .catch((error) => {
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
      <div className="chanceDestination">
        <div className="destinationRow row box2">
          { window.innerWidth <= 768 
          ? <div className="col-1 col-md-2 col-lg-3 col-xl-4 v1"></div>
          : null
          }
          <div className="col-11 col-md-10 col-lg-9 col-xl-12 info row">
            {(() => {
              if(baseValue === '') {
                return <div className="warning">Add some cash above, and let's check out those travel locations!</div>
              }
              return locations.map((travel) => {
                return <Destination key={travel.location} destination={travel.location} money={travel.money} currency={travel.currency} />
              })
            })()}
          </div>
        </div>
      </div>
      </div>
  
    )
  }

}

export default ChanceDestinations;