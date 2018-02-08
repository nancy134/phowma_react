import React, { Component } from "react";
import {Container, Row, Col} from 'reactstrap';
import {FormGroup} from 'reactstrap';
import {Label, Input} from 'reactstrap';
import {Card,CardBody, CardText,CardTitle} from 'reactstrap';
import {Button} from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';
import States from '../actions/States';
import PoliticianList from '../components/PoliticianList';
import "./Politicians.css";

const Toggles = {
  REPUBLICAN: 'republican',
  DEMOCRAT: 'democrat',
  INDEPENDENT: 'independent',
  SENATE: 'senate',
  HOUSE: 'house',
  GOVERNOR: 'governor',
  REPRESENTATIVE: 'representative',
  ALL: 'all',
}

const ALL_STATES = "All States";

export default class Home extends Component {
  constructor(props) {
    super(props)
    console.log("Politician:props: "+JSON.stringify(props));
    this.state = {
      stateName: ALL_STATES,
      democratSelected: true,
      republicanSelected: true,
      independentSelected: true,
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

    this.handleDemocratChange = this.handleDemocratChange.bind(this);
    this.handleRepublicanChange = this.handleRepublicanChange.bind(this);
    this.handleIndependentChange = this.handleIndependentChange.bind(this);

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
      this.setState({states: stateOpts,
                     stateData: states,
                     statesReceived: true});
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

  handleDemocratChange(e){
    this.setState({democratSelected: e.target.checked});
  }
  handleRepublicanChange(e){
    this.setState({republicanSelected: e.target.checked});
  }
  handleIndependentChange(e){
    this.setState({independentSelected: e.target.checked});
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
    this.setState({stateSelected: e.target.value});
  }

  renderPoliticians() {
    return <PoliticianList senateSelected={this.state.senateSelected}
                           houseSelected={this.state.houseSelected}
                           democratSelected={this.state.democratSelected}
                           republicanSelected={this.state.republicanSelected}
                           independentSelected={this.state.independentSelected}
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
      <CardTitle>Party</CardTitle>
      <FormGroup check>
        <Label check>
         <Input 
           type="checkbox" 
           onChange={this.handleDemocratChange}
           value={Toggles.DEMOCRAT}
           checked={this.state.democratSelected}
         />{' '}
           {Toggles.DEMOCRAT}
        </Label>
      </FormGroup>
      <FormGroup check> 
        <Label check>
        <Input
          type="checkbox"
          onChange={this.handleRepublicanChange}
          value={Toggles.REPUBLICAN}
          checked={this.state.republicanSelected}
        />{' '}
          {Toggles.REPUBLICAN}
        </Label>     
      </FormGroup>
      <FormGroup check>
        <Label check>
        <Input
          type="checkbox"
          onChange={this.handleIndependentChange}
          value={Toggles.INDEPENDENT}
          checked={this.state.independentSelected}
        />{' '}{Toggles.INDEPENDENT}
        </Label>
        
      </FormGroup>
      </Card>,
      <Card body>
        <CardTitle>Role</CardTitle>
        <FormGroup check>
        <Label check>
        <Input
          type="checkbox"
          onChange={this.handleSenateChange}
          value={Toggles.SENATE}
          checked={this.state.senateSelected}
        />{' '}{Toggles.SENATE}
        </Label>
        </FormGroup>
        <FormGroup check>
        <Label check>
        <Input
          type="checkbox"
          onChange={this.handleHouseChange}
          value={Toggles.HOUSE}
          checked={this.state.houseSelected}
        />{' '}{Toggles.HOUSE}
        </Label>
        </FormGroup>
        <FormGroup check>
        <Label check>
        <Input
          type="checkbox"
          onChange={this.handleGovernorChange}
          value={Toggles.GOVERNOR}
          checked={this.state.governorSelected}
        />{' '}{Toggles.GOVERNOR}
        </Label>
        </FormGroup>
      </Card>,
    ];
  }
  renderLinks(){
    return [
      <Card>
        <CardBody>
          <CardTitle>Representative</CardTitle>
          <CardText>Who is my representative? What is my congressional district?</CardText>
          <LinkContainer to="/representatives">
            <Button color="primary">My Representative</Button>
          </LinkContainer>
        </CardBody>
      </Card>,
      <Card>
        <CardBody>
          <CardTitle>Voter Registration</CardTitle>
          <CardText>Check to see if you are registered to vote</CardText>
          <LinkContainer to="/states">
            <Button color="primary">Voter Registration</Button>
          </LinkContainer>
        </CardBody>
      </Card>   
    ];
  }
  render() {
    console.log("Politicians:render()");
    if (!this.state.statesReceived) {
      return <div>Loading...</div>
    } else {
    return ([
      <Container className="mt-3">
        <Row className="show-grid">
          <Col md={3}>{this.renderFilter()}</Col>
          <Col md={6}>{this.renderPoliticians()}</Col>
          <Col md={3}>{this.renderLinks()}</Col>
        </Row>
      </Container>
    ]);
    }
  }
}
