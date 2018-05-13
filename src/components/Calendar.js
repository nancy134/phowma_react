import React, { Component } from "react";
import "./Calendar.css";
import moment from 'moment';
import Week from "../components/Week";

class Calendar extends React.Component {
  renderMonthLabel(){
    return ([
      <span>{moment("2018-11-06").format("MMMM,YYYY")}</span>
    ]);
  }
  renderDayNames(){
    return ([
      <div className="week names">
      <span className="day">Sun</span>
      <span className="day">Mon</span>
      <span className="day">Tue</span>
      <span className="day">Wed</span>
      <span className="day">Thu</span>
       	<span className="day">Fri</span>
       	<span className="day">Sat</span>
      </div>
    ]);
  }
  renderWeeks(){
    var weeks = [],
      done = false,
      date = moment("2018-11-06").startOf("month").add("w" -1).day("Sunday"),
      monthIndex = date.month(),
      count = 0;
  while (!done) {
      weeks.push(<Week key={date.toString()} date={date.clone()} month={moment("2018-11-06")} select=    {this.select} selected={this.props.selected} />);
      date.add(1, "w");
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  }
  render() {
    return ([
      <div id="calendar">
      <div>
      <div className="header">
        <i className="fa fa-angle-left"></i>
        {this.renderMonthLabel()}
        <i className="fa fa-angle-right"></i>
      </div>
      {this.renderDayNames()}
      {this.renderWeeks()}
      </div>
      </div>
    ]);
  }
}

export default Calendar;
