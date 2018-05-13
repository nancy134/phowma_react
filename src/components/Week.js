import React from 'react';

class Week extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date: props.date,
      month: props.month
    }
  }
  render(){
    var days = [],
      date = this.state.date,
      month = this.state.month

    for (var i = 0; i < 7; i++) {
      var day = {
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date
      };
      days.push(<span key={day.date.toString()} className={"day" + (day.isToday ? " today" : "") + (day.isCurrentMonth ? "" : " different-month") + (day.date.isSame(this.props.selected) ? " selected" : "")} >{day.number}</span>);
      date = date.clone();
      date.add(1, "d");

    }
    return([
<div className="week" key={days[0].toString()}>
      {days}
    </div>
    ]);
  }
}

export default Week;
