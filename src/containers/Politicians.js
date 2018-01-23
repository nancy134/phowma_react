import React, { Component } from "react";
import {Grid, Row, Col} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import {ButtonGroup} from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';
import {Checkbox} from 'react-bootstrap';
import {MenuItem} from 'react-bootstrap';
import {Panel} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import States from '../actions/States';
import PoliticianList from '../components/PoliticianList';
import MySmallModal from '../components/MySmallModal';
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
    States.search((states) => {
      stateOpts.push(<MenuItem eventKey={0}>{ALL_STATES}</MenuItem>);
      for(let i=0; i<states.length; i++){
        stateOpts.push(<MenuItem eventKey={states[i].id}>{states[i].name}</MenuItem>);
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

  handleStateChange(ek, e){
    this.setState({stateSelected: ek,
                  stateName: this.getName(ek)});
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
        <ButtonGroup justified>
          <DropdownButton title={this.state.stateName} id="state" onSelect={this.handleStateChange} >
            {this.state.states}
          </DropdownButton>
        </ButtonGroup>
      </FormGroup>,
      <Panel header="Party">
      <FormGroup>
        <Checkbox value={Toggles.DEMOCRAT} onChange={this.handleDemocratChange} checked={this.state.democratSelected}>{Toggles.DEMOCRAT}</Checkbox>
        <Checkbox value={Toggles.REPUBLICAN} onChange={this.handleRepublicanChange} checked={this.state.republicanSelected}>{Toggles.REPUBLICAN}</Checkbox>
        <Checkbox value={Toggles.INDEPENDENT} onChange={this.handleIndependentChange} checked={this.state.independentSelected}>{Toggles.INDEPENDENT}</Checkbox>
      </FormGroup>
      </Panel>,
      <Panel header="Role">
        <Checkbox value={Toggles.SENATE} onChange={this.handleSenateChange} checked={this.state.senateSelected}>{Toggles.SENATE}</Checkbox>
        <Checkbox value={Toggles.HOUSE} onChange={this.handleHouseChange} checked={this.state.houseSelected}>{Toggles.HOUSE}</Checkbox>
        <Checkbox value={Toggles.GOVERNOR} onChange={this.handleGovernorChange} checked={this.state.governorSelected}>{Toggles.GOVERNOR}</Checkbox>
      </Panel>,
    ];
  }
  renderLinks(){
    return [
      <Button>Button</Button>
    ];
  }
  render() {
    console.log("Politicians:render()");
    if (!this.state.statesReceived) {
      return <div>Loading...</div>
    } else {
    return ([
      <MySmallModal states={this.state.stateData} show={this.state.smShow} cb={this.callback}  onHide={this.handleOnHide} />,
      <Grid>
        <Row className="show-grid">
          <Col md={3}>{this.renderFilter()}</Col>
          <Col md={6}>{this.renderPoliticians()}</Col>
          <Col md={3}>{this.renderLinks()}</Col>
        </Row>
      </Grid>
    ]);
    }
  }
}
