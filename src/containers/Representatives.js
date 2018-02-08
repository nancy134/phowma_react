import React, { Component } from "react";
import {Container, Row, Col} from 'reactstrap';
import {Button} from 'reactstrap';
import {DropdownItem} from 'reactstrap';
import {Card, CardTitle} from 'reactstrap';
import States from '../actions/States';
import Districts from '../actions/Districts';
import PoliticianList from '../components/PoliticianList';
import Address from '../components/Address';
import "./Politicians.css";

const ALL_STATES = "All States";

export default class Representatives extends Component {
  constructor(props) {
    super(props)
    console.log("Representatives:props: "+JSON.stringify(props));
    this.state = {
      district_id: null,
      state_id: null,
      isOpen: false,
      address: "",
      city: "",
      state: "",
      zip: "",
      all: true,
      stateOpts: [],
      stateData: [],
      statesReceived: false,
      renderAddress: true,
    }
    this.handleOnHide = this.handleOnHide.bind(this);
    this.callback = this.callback.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount(){
    console.log("Representatives:componentWillMount");
  }
  componentDidMount(){
    console.log("Representatives:componentDidMount");
    var stateOpts = [];
    States.search("list",(states) => {
      console.log("States received");
      stateOpts.push(<DropdownItem eventKey={0}>{ALL_STATES}</DropdownItem>);
      for(let i=0; i<states.length; i++){
        stateOpts.push(<DropdownItem eventKey={states[i].id}>{states[i].name}</DropdownItem>);
      }
      console.log("this.state.districtid: "+this.state.district_id);
      if (this.state.district_id === null){
        this.setState({states: stateOpts,
                       stateData: states,
                       isOpen: true,
                       statesReceived: true});
      } else {
        this.setState({states: stateOpts,
                       stateData: states,
                       statesReceived: true});
      }
    });
  }
  onChange(){
    this.setState({
      isOpen: true,
      renderAddress: true,
    });
  }
  handleOnHide(){
    console.log("handleOnHide");
    this.setState({isOpen:false});
  }
  callback(address, city, state, zip, all){
    console.log("callback address: "+address);
    console.log("callback city: "+city);
    console.log("callback state: "+state);
    console.log("callback zip: "+zip);
    console.log("callback all: "+all);
    Districts.search(address, city, state, zip, (districts) => {
      console.log("districts: "+JSON.stringify(districts));
      this.setState({address: address,
                     city: city,
                     state: state,
                     zip: zip,
                     all: all,
                     district_id: districts.id, 
                     state_id: districts.state_id,
                     renderAddress: false});
    }).catch(error => console.log("This is the error: "+error));
  }
  renderPoliticians() {
    console.log("Representatives:renderPoliticians()");
    if (this.state.all){
    return <PoliticianList senateSelected={false}
                           houseSelected={true}
                           democratSelected={true}
                           republicanSelected={true}
                           independentSelected={true}
                           governorSelected={false}
                           stateSelected={0}
                           district_id={this.state.district_id}
                           state_id={this.state.state_id} />;
    }else if (this.state.district_id){
    return <PoliticianList senateSelected={false}
                           houseSelected={false}
                           democratSelected={false}
                           republicanSelected={false}
                           independentSelected={false}
                           governorSelected={false}
                           stateSelected={0}
                           district_id={this.state.district_id}
                           state_id={this.state.state_id} />;
    }
  }
  renderAddress() {
    console.log("Representatives:renderAddress()");
    console.log("renderAddress: "+this.state.renderAddress);
    if (this.state.renderAddress)
    return ([
      <Address
        states={this.state.stateData}
        isOpen={this.state.isOpen}
        cb={this.callback}
        onHide={this.handleOnHide}
        address={this.state.address}
        city={this.state.city}
        state={this.state.state}
        zip={this.state.zip}
      />
    ]);
    else
    return([]);
  }
  renderHeader(){
    if (this.state.city === "") {
      return([
        <h1>Enter address to find your representative.</h1>,
        <Button onClick={this.onChange}>Enter Address...</Button>
      ]);
    }else{
      return([
        <h1>Representatives for ...</h1>,
        <p>{this.state.address}, {this.state.city}, {this.state.state}, {this.state.zip}</p>,
        <Button onClick={this.onChange}>Change Address...</Button>
      ]);
    }
  }
  render() {
    console.log("Representatives:render()");
    if (!this.state.statesReceived) {
      return <div>Loading...</div>
    } else {
    return ([
      this.renderAddress(),
      <Container>
        <Row className="show-grid">
          <Col xs={8} md={6}>{this.renderPoliticians()}</Col>
          <Col xs={4} md={6}>{this.renderHeader()}</Col>
        </Row>
      </Container>
    ]);
    }
  }
}
