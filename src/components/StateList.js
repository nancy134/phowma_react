import React, { Component } from 'react';
import InfiniteScroll from './InfiniteScroll';
import States from '../actions/States';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Grid, Row, Col} from 'react-bootstrap';

class StateList extends Component {
    constructor(props) {
        super(props);
        console.log("StateList:props: "+JSON.stringify(props));
        this.state = {
            states: [],
        };
    }
    componentWillMount(){
      States.search((states) => {
        this.setState({states: states});
      });
    }
    componentWillReceiveProps(newProps){
      console.log("componentWillReceiveProps: newProps: "+JSON.stringify(newProps));
    }
    render() {
        console.log("StateList:render()");
        const loader = <div className="loader">Loading ...</div>;

        var items = [];
        this.state.states.map((state, i) => {
            items.push(
              
                <Row className="show-grid">
                  <Col xs={6} md={6}>
                    {this.state.states[i].name}
                  </Col>
                  <Col xs= {6} md={6}>
                    <a href={this.state.states[i].registered} target="_blank">Check registration in {this.state.states[i].name}</a>
                  </Col>
                </Row>
            );
        });

        return (
          <Grid>
            {items}
          </Grid>
        );
    }
};

export default StateList;
