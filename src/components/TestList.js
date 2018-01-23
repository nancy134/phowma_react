import React, { Component } from 'react';
import Politicians from '../actions/Politicians';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Grid, Row, Col} from 'react-bootstrap';
//import InfiniteScroll from 'react-infinite-scroller';
import InfiniteScroll from './InfiniteScroll';

class TestList extends Component {
    constructor(props) {
        super(props);
        console.log("TestList:props: "+JSON.stringify(props));
        this.state = {
            politicians: [],
            hasMoreItems: true,
            page: 0
        };
    }

    componentWillMount(){
      console.log("TestList:componentWillMount()");
    }

    componentWillReceiveProps(newProps){
      console.log("TestList:componentWillReceiveProps: newProps: "+JSON.stringify(newProps));
    }

    loadItems(page){
      console.log("page: "+page);
      if (page < 1) return;
      var self = this;
      Politicians.search(this.props, page,(politicians) => {
        if (politicians.length > 0) {
          this.setState({politicians: politicians});
        } else {
           self.setState({
             hasMoreItems: false
           });
        }
      });

    }
    render() {
        console.log("TestList:render()");
        //const loader = <div style="clear:both;" className="loader">Loading ...</div>;

        var items = [];
        this.state.politicians.map((politician, i) => {
            items.push(
              
                <Row className="show-grid">
                  <Col xs={6} md={6}>
                    {this.state.politicians[i].first_name}
                  </Col>
                  <Col xs={6} md={6}>
                    {this.state.politicians[i].state.name}
                  </Col>
                </Row>
            );
        });

        return (
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadItems.bind(this)}
            hasMore={this.state.hasMoreItems}
            threshold={10}
            loader={<div style={{ clear: 'both' }}>Loading...</div>}
            initialLoad={true}>
            <div>
              {items}
            </div>
          </InfiniteScroll>
        );
    }
};

export default TestList;
