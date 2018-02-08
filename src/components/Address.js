import React from 'react';
import {Button} from 'reactstrap';
import {Form, FormGroup, Input, Label} from 'reactstrap';

class Address extends React.Component {
  constructor(props){
    console.log("Address:constructor:props"+JSON.stringify(props));
    super(props);
    this.state = {
      address: props.address,
      city: props.city,
      state: props.state,
      zip: props.zip,
      states: props.states,
    }
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  componentDidMount(){
    console.log("Address:componentDidMount");
  }
  componentWillReceiveProps(newProps){
    console.log("Address:componentWillReceiveNewProps:newProps: "+JSON.stringify(newProps));
    this.setState({
      address: newProps.address,
      city: newProps.city,
      state: newProps.state,
      zip: newProps.zip,
      states: newProps.states, 
    });
  }
  handleAddressChange(e){
    this.setState({address: e.target.value});
  }
  handleCityChange(e){
    this.setState({city: e.target.value});
  }
  handleZipChange(e){
    this.setState({zip: e.target.value});
  }
  handleStateChange(e){
    console.log("e.target.value: "+e.target.value);
    this.setState({state: e.target.value});
  }
  onSave(){
    console.log("onSave() "+this.state.address+" "+this.state.city+" "+this.state.zip);
    this.props.cb(this.state.address, this.state.city, this.state.state, this.state.zip, false);
  }
  render(){
    console.log("Address:render()");
    var stateOpts = [];
    if (this.state.states){
      for (let i=0; i<this.state.states.length; i++){
        stateOpts.push(<option value={this.state.states[i].abbreviation}>{this.state.states[i].name}</option>);
      }
    }
    return(
      <Form>
        <h3>Enter address below to find your representative:</h3>
        <FormGroup>
          <Label>Address</Label>
            <Input value={this.state.address} placeholder="Enter address"onChange={this.handleAddressChange}/>
        </FormGroup>
        <FormGroup>
          <Label>City</Label>
          <Input value={this.state.city} placeholder="Enter city" onChange={this.handleCityChange}/>
        </FormGroup>
        <FormGroup controlId="stateSelect">
          <Label>State</Label>
          <Input type="select" value={this.state.state} placeholder="select" onChange={this.handleStateChange}>
           {stateOpts}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Zip Code</Label>
          <Input placeholder="Enter zip code" value={this.state.zip} onChange={this.handleZipChange}/>
        </FormGroup>
        <Button onClick={this.onSave}>Find Representatives</Button>
      </Form>
    );
  }
}

export default Address;
