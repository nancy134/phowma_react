import React, { Component } from "react";
import {Container, Row, Col} from 'reactstrap';
import States from '../actions/States';
import Districts from '../actions/Districts';
import PoliticianList from '../components/PoliticianList';
import Address from '../components/Address';
import "./Politicians.css";

export default class Representatives extends Component {
  constructor(props) {
    super(props)
    console.log("Representatives:props: "+JSON.stringify(props));
    this.state = {
      district_id: null,
      state_id: null,
      address: "",
      city: "",
      state: "",
      zip: "",
      all: true,
      stateData: [],
      statesReceived: false,
    }
    this.callback = this.callback.bind(this);
  }
  componentWillMount(){
    console.log("Representatives:componentWillMount");
  }
  componentDidMount(){
    console.log("Representatives:componentDidMount");
    States.search("list",(states) => {
      console.log("States received");
      this.setState({
        stateData: states,
        statesReceived: true
       });
    });
  }
  callback(address, city, state, zip, all){
    console.log("callback address: "+address);
    console.log("callback city: "+city);
    console.log("callback state: "+state);
    console.log("callback zip: "+zip);
    console.log("callback all: "+all);
    Districts.search(address, city, state, zip, (districts) => {
      console.log("districts: "+JSON.stringify(districts));
      this.setState({
        address: address,
        city: city,
        state: state,
        zip: zip,
        all: all,
        district_id: districts.id, 
        state_id: districts.state_id,
      });
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
    return ([
      <Address
        states={this.state.stateData}
        cb={this.callback}
        address={this.state.address}
        city={this.state.city}
        state={this.state.state}
        zip={this.state.zip}
      />
    ]);
  }
  render() {
    console.log("Representatives:render()");
    if (!this.state.statesReceived) {
      return <div>Loading...</div>
    } else {
    return ([
      <Container className="mt-3">
        <Row className="show-grid">
          <Col xs={8} md={8}>{this.renderPoliticians()}</Col>
          <Col xs={4} md={4}>{this.renderAddress()}</Col>
        </Row>
      </Container>
    ]);
    }
  }
}
