import React, { Component } from "react";
import ReactIframeResizer from 'react-iframe-resizer-super';


export default class PoliticalQuiz extends Component {
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
    console.log("Political:render()");
    return ([
      <ReactIframeResizer src="http://www.people-press.org/quiz/political-party-quiz/iframe/?groupdID=PMjfc"></ReactIframeResizer>
    ]);
  }
}
