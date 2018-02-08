import React, { Component } from "react";
import StateList from '../components/StateList';
import "./States.css";



export default class States extends Component {
  constructor(props) {
    super(props)
    console.log("States:props: "+JSON.stringify(props));
    this.state = {
    }

  }
  componentWillMount(){
  }
  componentDidMount(){
  }

  renderStates() {
    return <StateList/>;
  }


  render() {
    console.log("States:render()");
    return ([<StateList/>
    ]);
  }
}
