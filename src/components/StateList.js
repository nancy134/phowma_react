import React, { Component } from 'react';
import States from '../actions/States';
import {Container, Row, Col} from 'reactstrap';

class StateList extends Component {
    constructor(props) {
        super(props);
        console.log("StateList:props: "+JSON.stringify(props));
        this.state = {
            states: [],
        };
    }
    componentWillMount(){
      States.search("min",(states) => {
        this.setState({states: states});
      });
    }
    componentWillReceiveProps(newProps){
      console.log("componentWillReceiveProps: newProps: "+JSON.stringify(newProps));
    }
    render() {
        console.log("StateList:render()");

        var items = [];
        this.state.states.forEach((state, i) => {
            items.push(
              
                <Row className="border">
                  <Col xs={3} md={3}>
                    {this.state.states[i].name}
                  </Col>
                  <Col xs= {6} md={6}>
                    <a href={this.state.states[i].registered} target="_blank">Check registration in {this.state.states[i].name}</a>
                  </Col>
                </Row>
            );
        });

        return (
          <Container className="border">
            {items}
          </Container>
        );
    }
};

export default StateList;
