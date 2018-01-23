import React, { Component } from "react";
import {Grid, Row, Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {MenuItem} from 'react-bootstrap';
import {Panel} from 'react-bootstrap';
import States from '../actions/States';
import Districts from '../actions/Districts';
import PoliticianList from '../components/PoliticianList';
import MySmallModal from '../components/MySmallModal';
import "./Politicians.css";

const ALL_STATES = "All States";

export default class Representatives extends Component {
  constructor(props) {
    super(props)
    console.log("Representatives:props: "+JSON.stringify(props));
    this.state = {
      district_id: null,
      state_id: null,
      smShow: false,
      address: "",
      city: "",
      state: "",
      zip: "",
      stateOpts: [],
      stateData: [],
    }
    this.handleOnHide = this.handleOnHide.bind(this);
    this.callback = this.callback.bind(this);

  }
  componentWillMount(){
  }
  componentDidMount(){
    console.log("Representatives:componentDidMount");
    var stateOpts = [];
    States.search((states) => {
      stateOpts.push(<MenuItem eventKey={0}>{ALL_STATES}</MenuItem>);
      for(let i=0; i<states.length; i++){
        stateOpts.push(<MenuItem eventKey={states[i].id}>{states[i].name}</MenuItem>);
      }
      console.log("this.state.districtid: "+this.state.district_id);
      if (this.state.district_id === null){
        this.setState({states: stateOpts,
                       stateData: states,
                       smShow: true});
      } else {
        this.setState({states: stateOpts,
                       stateData: states});
      }
    });
  }

  handleOnHide(){
    console.log("handleOnHide");
    this.setState({smShow:false});
  }
  callback(address, city, state, zip){
    console.log("callback address: "+address);
    console.log("callback city: "+city);
    console.log("callback state: "+state);
    console.log("callback zip: "+zip);
    Districts.search(address, city, state, zip, (districts) => {
      console.log("districts: "+JSON.stringify(districts));
      this.setState({address: address,
                     city: city,
                     state: state,
                     zip: zip,
                     district_id: districts.id, 
                     state_id: districts.state_id});
    }).catch(error => console.log("This is the error: "+error));
  }
  renderPoliticians() {
    if (this.state.district_id){
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

  render() {
    return ([
      <MySmallModal states={this.state.stateData} show={this.state.smShow} cb={this.callback}  onHide={this.handleOnHide} />,
      <Panel header="Representatives for...">
      {this.state.address}, {this.state.city}, {this.state.state}, {this.state.zip}<Button>Change...</Button>
      </Panel>,
      <Grid>
        <Row className="show-grid">
          <Col xs={8} md={6}>{this.renderPoliticians()}</Col>
        </Row>
      </Grid>
    ]);
  }
}
