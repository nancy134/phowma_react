import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';

export default class Gerrymandering extends Component {
  constructor(props) {
    super(props)
    console.log("Gerrymandering:props: "+JSON.stringify(props));
    this.state = {
    }

  }
  componentWillMount(){
  }
  componentDidMount(){
  }

  render() {
    console.log("Gerrymandering:render()");
    return ([
      <Container>
        <Row>
          <Col>
            <img className="img-fluid" src="./gerry.png" />
          </Col>
        </Row>
      </Container>
    ]);
  }
}
