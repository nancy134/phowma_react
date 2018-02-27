import React, { Component } from "react";
import {Container, Row, Col} from 'reactstrap';
import {FormGroup, Label, Input} from 'reactstrap';
import {Card, CardTitle} from 'reactstrap';
import {Button} from 'reactstrap';
import States from '../actions/States';
import ElectionList from '../components/ElectionList';
import "./Politicians.css";

const Toggles = {
  SENATE: 'senate',
  HOUSE: 'house',
  GOVERNOR: 'governor',
  ALL: 'all',
}

const ALL_STATES = "All States";

export default class Home extends Component {
  constructor(props) {
    super(props)
    console.log("Politician:props: "+JSON.stringify(props));
    this.state = {
      stateName: ALL_STATES,
      senateSelected: true,
      houseSelected: false,
      governorSelected: false,
      city: "",
      district_id: null,
      state_id: null,
      stateData: [],
      stateOpts: [],
      statesReceived: false,
    }

    this.handleSenateChange = this.handleSenateChange.bind(this);
    this.handleHouseChange = this.handleHouseChange.bind(this);
    this.handleGovernorChange = this.handleGovernorChange.bind(this);

    this.handleStateChange = this.handleStateChange.bind(this);

    this.stateData = [];
  }
  componentWillMount(){
  }
  componentDidMount(){
    var stateOpts = [];
    States.search("list",(states) => {
      stateOpts.push(<option value={0}>{ALL_STATES}</option>);
      for(let i=0; i<states.length; i++){
        stateOpts.push(<option value={states[i].id}>{states[i].name}</option>);
      }
      console.log("States received");
      this.setState({
        states: stateOpts,
        stateData: states,
        statesReceived: true,
      });
     });
  }
  getName(id){
     if (id === 0) return ALL_STATES;
     for (let i=0; i<this.state.stateData.length; i++){
       if (this.state.stateData[i].id === id){
         return this.state.stateData[i].name;
       }
     }
     return "";
  }

  handleSenateChange(e){
    this.setState({senateSelected: e.target.checked});
  }
  handleHouseChange(e){
    this.setState({houseSelected: e.target.checked});
  }
  handleGovernorChange(e){
    this.setState({governorSelected: e.target.checked});
  }

  handleStateChange(e){
    console.log("e.target.value: "+e.target.value);
    console.log("e.target.selectedIndex: "+e.target.selectedIndex);
    console.log("e.target: "+e.target);
    this.setState({stateSelected: e.target.selectedIndex});
                  //stateName: this.getName(ek)});
  }

  renderElections() {
    return <ElectionList   senateSelected={this.state.senateSelected}
                           houseSelected={this.state.houseSelected}
                           governorSelected={this.state.governorSelected}
                           stateSelected={this.state.stateSelected}
                           district_id={this.state.district_id}
                           state_id={this.state.state_id} />;
  }


  renderFilter(){
    return [
      <FormGroup>
        <Input 
          type="select" 
          name="select" 
          id="state"
          onChange={this.handleStateChange}>
          {this.state.states}
        </Input>
      </FormGroup>,
      <Card body>
        <CardTitle>Role</CardTitle>
        <FormGroup check>
        <Label check>
        <Input 
          type="checkbox"
          onChange={this.handleSenateChange} 
          checked={this.state.senateSelected} 
        />{Toggles.SENATE}
        </Label>
        </FormGroup>
        <FormGroup check>
        <Label check>
        <Input
          type="checkbox"
          onChange={this.handleHouseChange} 
         checked={this.state.houseSelected} />{' '}{Toggles.HOUSE}
        </Label>
        </FormGroup>
        <FormGroup check>
        <Label check>
        <Input
          type="checkbox" 
          onChange={this.handleGovernorChange} 
          checked={this.state.governorSelected} />{' '}{Toggles.GOVERNOR}
         </Label>
         </FormGroup>
      </Card>,
    ];
  }
  renderLinks(){
    return [
      <Button>Button</Button>
    ];
  }
  render() {
    console.log("Elections:render()");
    if (!this.state.statesReceived){
      return <div>Loading...</div>
    } else {
      return ([
        <Container className="mt-3">
          <Row className="show-grid">
            <Col md={3}>{this.renderFilter()}</Col>
            <Col md={6}>{this.renderElections()}</Col>
            <Col md={3}>{this.renderLinks()}</Col>
          </Row>
        </Container>
      ]);
    }
  }
}
