import React, { Component } from 'react';
import InfiniteScroll from './InfiniteScroll';
import Elections from '../actions/Elections';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {Row, Col} from 'reactstrap';

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
        var name = "";
        this.state.elections.forEach((election, i) => {
          if (this.state.elections[i].position === "senate")
            name = "Senate ";
          else if (this.state.elections[i].position === "house")
            name = "House ";
          else if (this.state.elections[i].position === "governor")
            name = "Governor ";

          var stateName = "";
          if (this.state.elections[i].state)
            stateName = this.state.elections[i].state.name;

	  items.push(
            <ListGroupItem>
              <Row>
                <Col xs={4}>
                  <p>{name}</p>
                </Col>
                <Col xs={4}>
                  <p>{stateName}</p>
                </Col>
                <Col xs={4}>
                  <p>{this.state.elections[i].date}</p>
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
