import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import {Footer, Navi} from "./Nav.js"
import Dashboard from "./Dashboard.js"
import Home from "./Converter.js"


class App extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      screenWidth: '',
    }
  }

  componentDidMount() {
    this.setState({ screenWidth: window.innerWidth >= 768 ? true : false })

    window.addEventListener('resize', () => {
      if(window.innerWidth >= 768 && !this.state.screenWidth) {
        this.setState({ screenWidth: true })
      } else if (window.innerWidth < 768 && this.state.screenWidth) {
        this.setState ({ screenWidth: false })
      }
    })
  }


  render() {

    return (
      <Router>
        <div id="background">
          <Navi screenWidth={this.state.screenWidth}  />
          <Dashboard />
          <Footer />
        </div>
       
      </Router>
    )
  }
}

export default App;