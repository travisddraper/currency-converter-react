import React from 'react';
import { MDBIcon } from "mdbreact";
import getSymbolFromCurrency from 'currency-symbol-map'



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

function ChanceDestinations(props) {

  const {locations, baseValue} = props

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

export default ChanceDestinations;