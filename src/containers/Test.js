import React, { Component } from "react";
import {Grid, Row, Col} from 'react-bootstrap';
import TestList from '../components/TestList';
import "./Test.css";



export default class Test extends Component {
  constructor(props) {
    super(props)
    console.log("Test:props: "+JSON.stringify(props));
    this.state = {
    }

  }
  componentWillMount(){
  }
  componentDidMount(){
  }

  renderStates() {
    return <TestList/>;
  }


  render() {
    console.log("Test:render()");
    return ([<TestList/>
    ]);
  }
}
