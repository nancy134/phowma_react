import React from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

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
    this.onCancel = this.onCancel.bind(this);
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
    this.props.onHide();
  }
  onCancel(){
    this.props.onHide();
  }
  render(){
    console.log("Address:render()");
    if (this.state.statesReceived) {
      return(<div>Loading...</div>);
    } else {
      var stateOpts = [];
      if (this.state.states){
        for (let i=0; i<this.state.states.length; i++){
          stateOpts.push(<option value={this.state.states[i].abbreviation}>{this.state.states[i].name}</option>);
        }
      }
      return(
      <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Home Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup>
              <ControlLabel>Address</ControlLabel>
              <FormControl type="text" value={this.state.address} placeholder="Enter address"onChange={this.handleAddressChange}/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>City</ControlLabel>
              <FormControl type="text" value={this.state.city} placeholder="Enter city" onChange={this.handleCityChange}/>
            </FormGroup>
            <FormGroup controlId="stateSelect">
              <ControlLabel>State</ControlLabel>
              <FormControl componentClass="select" value={this.state.state} placeholder="select" onChange={this.handleStateChange}>
                {stateOpts}
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Zip Code</ControlLabel>
              <FormControl type="text" placeholder="Enter zip code" value={this.state.zip} onChange={this.handleZipChange}/>
            </FormGroup>
          </form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onSave}>OK</Button>
          <Button onClick={this.onCancel}>Cancel</Button>
        </Modal.Footer>
      </Modal>
      );
    }
  }
}

export default Address;
