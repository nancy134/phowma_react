import React, { Component } from 'react';
import InfiniteScroll from './InfiniteScroll';
import Elections from '../actions/Elections';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {Row, Col} from 'reactstrap';
import FA from 'react-fontawesome';
import {Button} from 'reactstrap';
import {CalendarIcon} from 'react-calendar-icon';
import {ThemeProvider} from 'styled-components';
import {Media} from 'reactstrap';

const theme = {
  calendarIcon: {
    textColor: "white",
    primaryColor: "#428bca",
    backgroundColor: "#f9f9f9"
  }
};

class ElectionList extends Component {
    constructor(props) {
        super(props);
        console.log("ElectionList:props: "+JSON.stringify(props));
        this.state = {
            elections: [],
            hasMoreItems: true,
            pageStart: 0,
            query: "",
            isRestart: false,
        };
    }

    loadItems(page) {
      console.log("ElectionList:loadItems page: "+page);
      var self = this;
      Elections.search(this.props, page, (elections) => {
        var els = [];
        if (page > 1)
          els = self.state.elections;
	if (elections.length === 0){
          self.setState({hasMoreItems: false});
        } else {
          for (let i=0; i<elections.length; i++){
             els.push(elections[i]);
          }
          self.setState({elections: els});
        }
      });
    }
    componentWillReceiveProps(newProps){
      console.log("ElectionList:componentWillReceiveProps: newProps: "+JSON.stringify(newProps));
      this.scroll.pageLoaded = 0;
      this.setState({isRestart: true,
                     hasMoreItems: true,
                     elections: [],
                     state_id: newProps.state_id,
                     district_id: newProps.district_id});
    }

    render() {
        console.log("ElectionList:render()");
        const loader = <div className="loader">Loading ...</div>;
        var items = [];
        var position = "";
        this.state.elections.forEach((election, i) => {
          if (this.state.elections[i].office.position === "senator")
            position = "US Senator";
          else if (this.state.elections[i].office.position === "representative")
            position = "US Representative";
          else if (this.state.elections[i].position === "governor")
            position = "Governor";

          var stateName = "";
          var districtName = "";
          if (this.state.elections[i].office.state)
            stateName = this.state.elections[i].office.state.name;
          if (this.state.elections[i].office.district)
            districtName = this.state.elections[i].office.district.name + " Congressional District";

          var wikipedia = <Button color="link" onClick={(e) => this.onWikipedia("http://www.wikipedia.com/",e)}> <FA size="2x" name="wikipedia-w" /></Button>

          var dateOptions = {
            header: { weekday: "short" },
            footer: { month: "short" },
            value:  { day: "2-digit" },
            locale: "en"
          }
          var date = new Date(this.state.elections[i].date);

          var politician = "";
          if (this.state.elections[i].office.politician && this.state.elections[i].office.politician.party !== "vacant"){
            politician = <Media object src={this.state.elections[i].office.politician.avatar_thumb}/>
          }

	  items.push(
            <ListGroupItem>
              <Row>
                <Col xs={3}>
                  {politician}
                </Col>
                <Col xs={5}>
                  <p className="font-weight-bold">{position}</p>
                  <p>{stateName}</p>
                  <p>{districtName}</p>
                </Col>
                <Col xs={4}>
                  <p>General Election</p>
                  <ThemeProvider theme={theme}>
                    <CalendarIcon date={date} options={dateOptions} />
                  </ThemeProvider>
                  {wikipedia}
                </Col> 
              </Row>
            </ListGroupItem>
          );
        });

        return (
            <InfiniteScroll ref={(scroll) => {this.scroll = scroll;}}
                pageStart={this.state.pageStart}
                loadMore={this.loadItems.bind(this)}
                hasMore={this.state.hasMoreItems}
                isRestart={this.state.isRestart}
                initialLoad={true}
                loader={loader}>
                <ListGroup>
                    {items}
                </ListGroup>
            </InfiniteScroll>
        );
    }
};

export default ElectionList;
