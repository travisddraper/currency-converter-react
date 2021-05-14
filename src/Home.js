import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import travel from './images/travel_background.jpg'
import { MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownType from 'react-bootstrap/Dropdown';


class DropdownCurrency extends React.Component {
    constructor() {
      super();
      
      this.state = {
        showMenu: false,
      };
      
      this.showMenu = this.showMenu.bind(this);
      this.closeMenu = this.closeMenu.bind(this);
    }
    
    showMenu(event) {
        event.preventDefault();
      
        this.setState({ showMenu: true, });
        document.getElementById('root').addEventListener('click', this.closeMenu);
    }

    closeMenu() {
        this.setState({
            showMenu: false,
        })
        document.getElementById('root').removeEventListener('click', this.closeMenu);
    }
  
    render() {
      return (
        <div className="buttonHolster">
          <button className="btn-sm" onClick={this.showMenu}>
            USD
          </button>
          
          {
            this.state.showMenu
              ? (
                <div className="menu">
                  <button className="menuItem w-100"> USD</button>
                  <button className="menuItem w-100"> AUD </button>
                  <button className="menuItem w-100"> EUR </button>
                </div>
              )
              : (
                null
              )
          }
        </div>
      );
    }
  }


class CurrencyForm extends React.Component {


    render() {
        return (
            <form class="d-flex">
                <DropdownCurrency className="mr-2" />
                <input
                    placeholder="{ConvertFrom}"
                    className="convertFrom"
                    type="number"
                >  
                </input>
                <MDBIcon className="mx-2 mt-2" icon="angle-right" />
                <input
                    placeholder="{ConvertTo}"
                    className="convertTo"
                    type="number"
                >
                </input>
                <DropdownCurrency className="ml-2" />

            </form>
        )
    }
}



class Home extends React.Component {

    render() {
 
    return (
      <div className="container">
        <div className="box">
            <div className="innerBox">
            <div className="row currencyRow">
                <button>
                    <Link to="/">Currency Converter</Link>
                </button>
                <button>
                    <Link to="/chart">Currency Chart</Link>
                </button>
                <button>
                    <Link to="/chart/bangforbuck">Bang for Your Buck</Link>
                </button>
            </div>
            <div className="row formRow">
                <CurrencyForm />
            </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Home