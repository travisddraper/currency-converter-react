import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import travel from './images/travel_background.jpg'
import { MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownType from 'react-bootstrap/Dropdown';

function Title(props) {

  return (
    <h1 id="pageTitle">Travel Money</h1>
  )
}


class DropdownCurrency extends React.Component {
    constructor() {
      super();
    }
  
    render() {
      return (
        <DropdownButton 
          id="currencyButton" 
          variant="Secondary"
          size="sm"
          title="USD"
          
        >
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
      );
    }
  }


class CurrencyForm extends React.Component {


    render() {
        return (
            <form className="row formRow px-2">
              <div className="col-5 conversion">
              <DropdownCurrency className="mr-2" />
                <input
                    placeholder="{ConvertFrom}"
                    className="convertFrom"
                    type="number"
                >  
                </input>
              </div>
              <div className="col-1 arrow">
                <MDBIcon className="" icon="angle-right" size="3x" />
              </div>
              <div className="col-5 conversion">
              <input
                    placeholder="{ConvertTo}"
                    className="convertTo"
                    type="number"
                >
                </input>
                <DropdownCurrency className="ml-2" />
              </div>
            </form>
        )
    }
}



class Home extends React.Component {

    render() {
 
    return (
      <>
      <Title />
      <div className="currencyCoverter box">
          <div className="innerBox">
          <div className="row currencyRow">
              <button className="topLeftButton">
                  <Link to="/">Currency Converter</Link>
              </button>
              <button className="middleButton">
                  <Link to="/chart">Currency Chart</Link>
              </button>
              <button className="topRightButton">
                  <Link to="/chart/bangforbuck">Bang for Your Buck</Link>
              </button>
          </div>
          <CurrencyForm />
          </div>
      </div>
      </>
    )
  }
}

export default Home