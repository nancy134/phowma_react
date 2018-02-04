import React, { Component } from "react";
import "./Home.css";
import {Grid, Row, Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import { LinkContainer } from 'react-router-bootstrap';
import { Jumbotron} from 'react-bootstrap';

bootstrapUtils.addStyle(Button, 'custom');

export default class Home extends Component {
  handleRegistered(){
    console.log("Handle registered");
  }
  render() {
    return (
      <div className="Home">
        <div className="lander">
      <style type="text/css">{`
          .btn-custom {
           white-space: normal;
           }
      `}</style>
          <Grid>
            <Row className="show-grid">
              <Col sm={3} >
                <Jumbotron>
                <LinkContainer to="/politicians">
                  <Button bsStyle="link" bsSize="large" style="white-space:normal">What are the politicians saying?</Button>
                </LinkContainer>
                </Jumbotron>
              </Col>
              <Col sm={3}>
                <Jumbotron>
                <LinkContainer to="/representatives">
                  <Button bsStyle="custom" bsSize="large" block>Who are my representatives?</Button>
                </LinkContainer>
                </Jumbotron>
              </Col>
              <Col sm={3} >
                <Jumbotron>
                <LinkContainer to="/states">
                  <Button bsStyle="custom" bsSize="large" block>Am I registered to vote?</Button>
                </LinkContainer>
                </Jumbotron>
              </Col>
              <Col sm={3} >
                <Jumbotron>
                <LinkContainer to="/elections">
                  <Button bsStyle="custom" bsSize="large" block>Who is up for re-election?</Button>
                </LinkContainer>
                </Jumbotron>
              </Col>
            </Row>
            <Row>
              <Col sm={3}>
                <Jumbotron>
                  <LinkContainer to="/gerrymandering">
                    <Button bsStyle="custom" bsSize="large" block>What is gerrymandering?</Button>
                  </LinkContainer>
                </Jumbotron>
              </Col>
              <Col sm={3}>
                <Jumbotron>
                  <LinkContainer to="/gerrymandering">
                    <Button bsStyle="custom" bsSize="large" block>What is Citizens United?</Button>
                  </LinkContainer>
                </Jumbotron>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}
