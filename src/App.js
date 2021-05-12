import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DropdownButton from 'react-bootstrap/DropdownButton'
import { MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";

import './App.css';

import Navigation from './Nav.js';
import { Footer } from './Nav.js';
import Home from './Home.js';



function App() {

  return (
    <div class="background">
    <Navigation />
    <Home /> 
    <Footer />
    </div>
  );
}

export default App;
