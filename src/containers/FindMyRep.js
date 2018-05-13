import React, { Component } from "react";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import Districts from '../actions/Districts';
import {Container, Row, Col} from 'reactstrap';
import {CardDeck, Card, CardHeader, CardImg, CardBody, CardText, CardTitle, CardSubtitle} from 'reactstrap';
import {Button} from 'reactstrap';
import {Media} from 'reactstrap';
import ReactMapboxGl, {Layer, Feature} from 'react-mapbox-gl';
import Calendar from '../components/Calendar';
import FA from 'react-fontawesome';
import "./FindMyRep.css"
import {Jumbotron} from 'reactstrap';
import {Helmet} from 'react-helmet';
import {withRouter} from 'react-router-dom';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoicGhvd21hIiwiYSI6ImNqZzJreno3YjFnYmYyeG83OGhwYnN5bXcifQ.1vQnq8Wx5FGnG7OJHnsJNw",
  dragPan: false
});

var bg = require('../images/background.jpg')
var votebuttons = require('../images/votebuttons.jpg')

class FindMyRep extends Component {
  constructor(props) {
    super(props)
    console.log("FindMyRep:props: "+JSON.stringify(props));
    this.state = {
      address: "",
      district: null
    }
    this.onChange = (address) => this.setState({address})
    this.onStyleLoad = this.onStyleLoad.bind(this);
  }
  componentWillMount(){
  }
  componentDidMount(){
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
  handleFormSubmit = (event) => {
    console.log("handleFormSubmit");
    event.preventDefault()
    geocodeByAddress(this.state.address)
      .then(results => {
        getLatLng(results[0]);
      })
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))

    Districts.searchFull(this.state.address, (district) => {
      console.log("districts: "+JSON.stringify(district));
      if (!district.message){
        //this.setState({district: district});
        this.props.history.push('/district/'+district.id);
      }
    }).catch(error => console.log("This is the error: "+error));

  }
  renderAddressBar(){
    const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
      <div className="autocomplete-root">
        <input {...getInputProps()} />
          <div className="autocomplete-dropdown-container">
            {suggestions.map(suggestion => (
              <div {...getSuggestionItemProps(suggestion)}>
                <span>{suggestion.description}</span>
              </div>
            ))}
          </div>
        </div>
    );
    return ([
      <section class="call-to-action text-white text-center">
        <div class="overlay"></div>
          <div class="container">
            <div class="row">
              <div class="col-xl-9 mx-auto">
                <h2 class="mb-4">Enter your address below to find your US Representative.</h2>
              </div>
              <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
                <form onSubmit={this.handleFormSubmit}>
                  <div class="form-row">
                    <div class="col-12 col-md-9 mb-2 mb-md-0">
                    <PlacesAutocomplete
                      value={this.state.address}
                      onChange={this.onChange}
                    >
                      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: 'Enter address...',
                              className: 'location-search-input form-control'
                            })}
                          />
                          <div className="autocomplete-dropdown-container list-group">
                            {suggestions.map(suggestion => {
                              const className = suggestion.active ? 'suggestion-item--active list-group-item' : 'suggestion-item list-group-item';
                              // inline style for demonstration purpose
                              const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                              return (
                                <div {...getSuggestionItemProps(suggestion, { className, style })}>
                                  <span>{suggestion.description}</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  </div>
                  <div class="col-12 col-md-3">
                    <button type="submit" class="btn btn-block btn-lg btn-primary">Find</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    ]);
  }
  renderPolitician(){
    if (this.state.district){
      return([
        <div class="row no-gutters">
          <div class="col-lg-6 order-lg-2 text-white showcase-img" style={{backgroundImage: "url("+bg+")"}}>
            <div >
              <img class="pimage" src={this.state.district.politician.avatar_original}/>
            </div>
          </div>
          <div class="col-lg-6 order-lg-1 my-auto showcase-text">
            <h2>{this.state.district.politician.first_name} {this.state.district.politician.last_name}</h2>
            <p class="lead mb-0">{this.state.district.politician.party} from {this.state.district.state.name}</p>
            <div className="float-right">
              <Button color="link"><FA size="2x" name="facebook" /></Button>
              <Button color="link"> <FA size="2x" name="twitter" /></Button>
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
        <div class="row no-gutters">
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
          </div>
        </div>
      ]);
    } 
  }
  render() {
    return ([
      <div>{this.renderAddressBar()}</div>,
      <section class="showcase">
        <div class="container-fluid p-0">
          {this.renderPolitician()}
          {this.renderDistrict()}
        <div class="row no-gutters">
          <div class="col-lg-6 order-lg-2 text-white showcase-img" style={{backgroundImage: "url("+bg+")"}}>
            <div style={{height:'100%'}}>
              <img class="xpimage" src="./MA.png"/>
            </div>
          </div>
          <div class="col-lg-6 order-lg-1 my-auto showcase-text">
            <h2>Massachusetts</h2>
            <Button color="primary">Check your voter registration</Button>
          </div>
        </div>

        <div class="row no-gutters">
          <div class="col-lg-6 text-white showcase-img" style={{backgroundImage:"url("+votebuttons+")"}}>
          </div>

          <div class="col-lg-6 my-auto showcase-text">
            <h2>Important Dates</h2>
            <Calendar/>
            <p>Primary: June 5, 2018</p>
            <p>General: November 6, 2018</p>
          </div>
        </div>

      </div>
    </section>
  ]);
  }
}

export default withRouter(FindMyRep);
