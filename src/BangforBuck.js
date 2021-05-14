import React from 'react';
import { MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import { Redirect } from 'react-router';

function Title(props) {
 
  return(
    <h1 className={props.location}>Best <span style={{color: "red"}}>Destinations</span><br /> for your Money!</h1>
  )
}

class Destination extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (

      <div className="destination col-4">
        <MDBIcon className="d-inline mb-3 pr-2 arrow" icon="angle-right" />
        <p>Travel to <b>destination</b> and have 55.67 <b>Currency</b>!</p>
      </div>
    )
  }
}

class BangforBuck extends React.Component {

    render() {
      return (
        <>
          <Title location="Bang1 destinationTitle" />
          <div className="bangBuck row box2">
            <div className="col-1 col-md-2 col-lg-3 col-xl-4 v1">
            </div>
            <div className="col-11 col-md-10 col-lg-9 col-xl-8 info row">
              <Destination />
              <Destination />
              <Destination />
            </div>
          </div>
        </>
      )
    }
  
}

export default BangforBuck;