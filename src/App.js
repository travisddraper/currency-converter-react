import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DropdownButton from 'react-bootstrap/DropdownButton'
import './App.css';

import Navigation from './Nav.js';




function App() {
  return (
    <Navigation> 
      <a href="#">Home</a><br/>
      <a href="#">Portfolio</a>
    </Navigation>
  );
}

export default App;
