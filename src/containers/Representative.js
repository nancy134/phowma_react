import React, { Component } from "react";
import {Container, Row, Col} from "reactstrap";



export default class Representative extends Component {
  constructor(props) {
    super(props)
    console.log("Representative:props: "+JSON.stringify(props));
    this.state = {
    }

  }
  componentWillMount(){
  }
  componentDidMount(){
  }

  render() {
    console.log("Representative:render()");
    return ([
      <Container className="mt-3">
        <Row>
          <Col md={3}></Col>
          <Col md={9}>
            Hello
          </Col>
        </Row>
      </Container>
    ]);
  }
}
