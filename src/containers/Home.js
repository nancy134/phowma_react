import React, { Component } from "react";
import "./Home.css";
import {Button} from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { CardColumns, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

export default class Home extends Component {
  handleRegistered(){
    console.log("Handle registered");
  }
  render() {
    return ([
      <Container className="mt-3">
      <Row>
      <Col sm="12" md={{size:10, offset:1}}>
      <CardColumns>
        <Card>
          <CardBody>
            <CardTitle>Social Media</CardTitle>
            <CardText>See what our elected officials are saying on social media</CardText>
              <LinkContainer to="/politicians">
                <Button color="primary">Social Media</Button>
              </LinkContainer>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle>Representative</CardTitle>
            <CardText>Who is my representative?  What is my congressional district?</CardText>
            <LinkContainer to="/representatives">
              <Button color="primary">My Representative</Button>
            </LinkContainer>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle>Voter Registration</CardTitle>
            <CardText>Check to see if you are registered to vote</CardText>
            <LinkContainer to="/states">
              <Button color="primary">Voter Registration</Button>
            </LinkContainer>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle>Upcoming Elections</CardTitle>
            <CardText>What are the upcoming elections</CardText>
            <LinkContainer to="/elections">
              <Button color="primary">Elections</Button>
            </LinkContainer>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle>Political Party</CardTitle>
            <CardText>Take this quiz from the Pew Research Center to find out where you fit on the political spectrum</CardText>
            <LinkContainer to="/politicalquiz">
              <Button color="primary">Political Quiz</Button>
            </LinkContainer>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle>Gerrymandering</CardTitle>
            <CardText>What is gerrymandering and why is it important to voters?</CardText>
            <LinkContainer to="/gerrymandering">
              <Button color="primary">Gerrymandering</Button>
            </LinkContainer>
          </CardBody>
        </Card> 
      </CardColumns>
      </Col>
      </Row>
      </Container>,
    ]);
  }
}
