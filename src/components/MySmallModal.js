import React from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class MySmallModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stateOpts: [],
      address: "",
      city: "",
      state: "",
      zip: "",
    }
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  componentDidMount(){
    console.log("MySmallModal:componentDidMount");
  }
  componentWillReceiveProps(newProps){
    console.log("MySmallModal:componentWillReceiveNewProps");
    var stateOpts = [];
    if (newProps.states){
      for(let i=0; i<newProps.states.length; i++){
        stateOpts.push(<option value={newProps.states[i].abbreviation}>{newProps.states[i].name}</option>);
      }
      this.setState({stateOpts: stateOpts,
                     state: newProps.states[0].abbreviation});
    }
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
    this.props.cb(this.state.address, this.state.city, this.state.state, this.state.zip);
    this.props.onHide();
  }
  render(){
    console.log("MySmallModal:render()");
    return(
      <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup>
              <ControlLabel>Address</ControlLabel>
              <FormControl type="text" placeholder="Enter address"onChange={this.handleAddressChange}/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>City</ControlLabel>
              <FormControl type="text" placeholder="Enter city" onChange={this.handleCityChange}/>
            </FormGroup>
            <FormGroup controlId="stateSelect">
              <ControlLabel>State</ControlLabel>
              <FormControl componentClass="select" placeholder="select" onChange={this.handleStateChange}>
                {this.state.stateOpts}
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Zip Code</ControlLabel>
              <FormControl type="text" placeholder="Enter zip code" onChange={this.handleZipChange}/>
            </FormGroup>
          </form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onSave}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MySmallModal;
