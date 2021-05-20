import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import {Footer, Navi} from "./Nav.js"
import Home from "./Home.js"
import Portfolio from './Portfolio.js'

class App extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      screenWidth: window.innerWidth,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({ screenWidth: window.innerWidth})
    })
  }

  render() {
;
    return (
      <Router>
        <Navi screenWidth={this.state.screenWidth} />
        <Switch>
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </Router>
    )
  }
}

export default App;