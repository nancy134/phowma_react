import React, { Component } from 'react';
import {Nav, Navbar, NavbarBrand, NavbarToggler, Collapse} from 'reactstrap';
import Routes from './Routes';
import RouteNavItem from './components/RouteNavItem';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  componentDidMount(){
  }
  render() {
    return (
      <div>
        <Navbar expand="md" color="dark" className="navbar-dark">
          <NavbarBrand href="/">Voter-Information</NavbarBrand>
          <NavbarToggler onClick={this.toggle} className="mr-2"/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <RouteNavItem href="/politicians">Social</RouteNavItem>
              <RouteNavItem href="/representatives">Representatives</RouteNavItem>
              <RouteNavItem href="/elections">Elections</RouteNavItem>
              <RouteNavItem href="/states">Voting</RouteNavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Routes></Routes>
      </div>
    );
  }
}

export default App;
