import React, { Component } from "react";
import {Container, Row, Col} from "reactstrap";
import StateList from '../components/StateList';
import "./States.css";



export default class States extends Component {
  constructor(props) {
    super(props)
    console.log("States:props: "+JSON.stringify(props));
    this.state = {
    }

  }
  componentWillMount(){
  }
  componentDidMount(){
  }

  render() {
    console.log("States:render()");
    return ([
      <Container className="mt-3">
        <Row>
          <Col md={3}></Col>
          <Col md={9}>
            <StateList/>
          </Col>
        </Row>
      </Container>
    ]);
  }
}
