import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import './App.css';
import Routes from './Routes';
import RouteNavItem from './components/RouteNavItem';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount(){
  }
  render() {
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Voter-Information</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <RouteNavItem href="/politicians">Politicians</RouteNavItem>
              <RouteNavItem href="/signup">Signup</RouteNavItem>
              <RouteNavItem href="/login">Login</RouteNavItem>
              <RouteNavItem href="/representatives">My Representatives</RouteNavItem>
              <RouteNavItem href="/states">States</RouteNavItem>
              <RouteNavItem href="/elections">Elections</RouteNavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes></Routes>
      </div>
    );
  }
}

export default App;
