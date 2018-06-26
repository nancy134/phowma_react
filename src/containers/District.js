import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Districts from '../actions/Districts';
import FA from 'react-fontawesome';
import {Button} from 'reactstrap';
import ReactMapboxGl, {Layer, Feature} from 'react-mapbox-gl';
import Calendar from '../components/Calendar';
import scrollToComponent from 'react-scroll-to-component';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoicGhvd21hIiwiYSI6ImNqZzJreno3YjFnYmYyeG83OGhwYnN5bXcifQ.1vQnq8Wx5FGnG7OJHnsJNw",
  dragPan: false
});

var bg = require('../images/background.jpg')
var votebuttons = require('../images/votebuttons.jpg')

export default class District extends Component {
  constructor(props) {
    super(props)
    console.log("District:props: "+JSON.stringify(props));
    this.state = {
      district: null
    }
    this.onStyleLoad = this.onStyleLoad.bind(this);
    this.onDistrict = this.onDistrict.bind(this);
    this.onPolitician = this.onPolitician.bind(this);
    this.onState = this.onState.bind(this);
  }
  componentWillMount(){
  }
  componentDidMount(){
    Districts.show(this.props.match.params.id, (district) => {
      console.log("got district");
      console.log("district: "+JSON.stringify(district));
      this.setState({district: district});
    });
  }
  onStyleLoad(map){
    console.log("onStyleLoad");
    var stateAbbr = "MA";
    var districtCode = "05";
    if (this.state.district){
      stateAbbr = this.state.district.state.abbreviation;
      if (this.state.district.number < 10){
        districtCode = "0" + this.state.district.number;
      } else {
        districtCode = this.state.district.number;
      }

    }
    console.log("stateAbbr: "+stateAbbr+" districtCode: "+districtCode);
    if (!map) {
      console.log("map=null");
      return;
    }
    for (var i=1; i<=5; i++){
      var existingFilter = map.getFilter('districts_'+i);
      if (existingFilter[0] === 'all') {
        existingFilter = existingFilter[existingFilter.length -1];
      }
      var filter = ['all'];

      if (stateAbbr) filter.push(["==", 'state', stateAbbr]);
      if (districtCode) filter.push(["==", 'number', districtCode]);

      var layerFilter = filter.concat([existingFilter]);

      map.setFilter('districts_' + i, layerFilter);
      map.setFilter('districts_' + i + '_boundary', layerFilter);
      map.setFilter('districts_' + i + '_label', layerFilter);
    }
    var boundaryFilter = ['all'];
    if (stateAbbr) boundaryFilter.push(['==', 'state', stateAbbr]);
    if (districtCode) boundaryFilter.push(['==', 'number', districtCode]);

    map.setFilter('districts_boundary_line', boundaryFilter);
  }

  onDistrict(){
    scrollToComponent(this.refs.district, {
      offset: 0,
      align: 'top',
      duration: 1000
    });
  }
  onPolitician(){
    scrollToComponent(this.refs.politician, {
      offset: 0,
      align: 'top',
      duration: 1000
    });
  }
  onState(){
    scrollToComponent(this.refs.state, {
      offset: 0,
      align: 'botton',
      duration: 1000
    });
  }
  renderPolitician(){
    if (this.state.district){
      return([
        <div ref="politician" class="row no-gutters">
          <div class="col-lg-6 order-lg-2 text-white showcase-img" style={{backgroundImage: "url("+bg+")"}}>
            <div >
              <img class="pimage" src={this.state.district.politician.avatar_original}/>
            </div>
          </div>
          <div class="col-lg-6 order-lg-1 my-auto showcase-text">
            <h2>{this.state.district.politician.first_name} {this.state.district.politician.last_name} ({this.state.district.politician.party})</h2>
            <p class="lead mb-0">US House of Representatives</p>
            <div>
            <Button color="link" className="p-0" onClick={this.onDistrict}>{this.state.district.state.name} {this.state.district.name} congressional district</Button></div>
 
            <Button color="link" className="pl-0" onClick={this.onState}>2018 Election</Button>
            <div >
              <Button color="link" className="pl-0"><FA size="2x" className="pull-left" name="facebook" /></Button>
              <Button color="link" className="pl-0"> <FA size="2x" className="pull-left" name="twitter" /></Button>
            </div>
          </div>
        </div>
      ]);
    }
  }
  renderDistrict(){
    if (this.state.district){
      var mapCoord = [];
      mapCoord.push([parseFloat(this.state.district.longitude1),parseFloat(this.state.district.latitude1)]);
      mapCoord.push([parseFloat(this.state.district.longitude2),parseFloat(this.state.district.latitude2)]);
      console.log("mapCoord: "+mapCoord.toString());
      console.log("longitude1.to_f: "+parseFloat(this.state.district.longitude1));
      return([
        <div ref="district" class="row no-gutters">
          <div class="col-lg-6 text-white showcase-img" >
            <div style={{height:'100%'}} >
              <Map
                onStyleLoad={this.onStyleLoad}
                style="mapbox://styles/phowma/cjg3n4s451i4z2so5l1lltx4u"
                fitBounds = {mapCoord}
                containerStyle={{
                  width: "100%",
                  height: "100%"
                }}>
              </Map>
            </div>
          </div>
          <div class="col-lg-6 my-auto showcase-text">
            <h2>{this.state.district.state.name}</h2>
            <p class="lead mb-0">{this.state.district.name} Congressional District</p>
            <Button color="link" className="pl-0" onClick={this.onPolitician}>US Representative {this.state.district.politician.first_name} {this.state.district.politician.last_name}</Button>
          </div>
        </div>
      ]);
    }

  }
  renderState(){
    if (this.state.district) {
      return([
        <div ref="state" class="row no-gutters">
          <div class="col-lg-6 order-lg-2 text-white showcase-img" style={{backgroundImage: "url("+votebuttons+")"}}>
          </div>
          <div class="col-lg-6 my-auto showcase-text">
            <h2>Voting in {this.state.district.state.name}</h2>
            <h4>Key Dates</h4>
            <p class="mb-1">Primary Election: June 5, 2018</p>
            <p>General Election: November 6, 2018</p>
            <h4>Key Races</h4>
            <Button color="link" className="pl-0">Senate</Button>
            <Button color="link" className="pl-0">House</Button>
            <Button color="link" className="pl-0">Governor</Button>
            <h4>Actions</h4>
            <div>
              <Button color="primary">Check your voter registration</Button>
            </div>
          </div>
        </div>
      ]);
    }
  }
  render() {
    console.log("District:render()");
    if (this.state.district){
      return ([
        <section class="showcase">
          <div class="container-fluid p-0">
            {this.renderPolitician()}
            {this.renderDistrict()}
            {this.renderState()}
          </div>
        </section>
      ]);
    }
    else {
      return([
        <p>No district found</p>
      ]);
    }
  }
}
