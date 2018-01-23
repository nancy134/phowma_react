import React, { Component } from 'react';
import InfiniteScroll from './InfiniteScroll';
import Politicians from '../actions/Politicians';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Row, Col} from 'react-bootstrap';
import {Image} from 'react-bootstrap';
import LatestPost from '../components/LatestPost';

class PoliticianList extends Component {
    constructor(props) {
        super(props);
        console.log("PoliticianList:props: "+JSON.stringify(props));
        this.state = {
            politicians: [],
            hasMoreItems: true,
            pageStart: 0,
            query: "",
            isRestart: false,
            index: 0,
        };
    }

    loadItems(page) {
      console.log("loadItems page: "+page);
      var self = this;
      Politicians.search(this.props, page, (politicians) => {
        var pols = [];
        if (page > 1)
          pols = self.state.politicians;
	if (politicians.length === 0){
          self.setState({hasMoreItems: false});
        } else {
          for (let i=0; i<politicians.length; i++){
             pols.push(politicians[i]);
          }
          self.setState({politicians: pols});
        }
      });
    }
    componentWillReceiveProps(newProps){
      console.log("componentWillReceiveProps: newProps: "+JSON.stringify(newProps));
      this.scroll.pageLoaded = 0;
      this.setState({isRestart: true,
                     hasMoreItems: true,
                     politicians: [],
                     state_id: newProps.state_id,
                     district_id: newProps.district_id});
    }

    render() {
        console.log("PoliticianList:render()");
        const loader = <div className="loader">Loading ...</div>;
        var items = [];
        var name = "";
        var social_id = "";
        var social_type = "";
        this.state.politicians.map((politician, i) => {
          this.state.index = i;
          name = "";
          if (this.state.politicians[i].position == "senator")
            name = "Senator ";
          else if (this.state.politicians[i].position == "representative")
            name = "Representative ";
          else if (this.state.politicians[i].position == "governor")
            name = "Governor ";

          name = name + this.state.politicians[i].first_name + " " + this.state.politicians[i].last_name;
          if (this.state.politicians[i].party == "democrat")
            name = name + " (D)";
          else if (this.state.politicians[i].party == "republican")
            name = name + " (R)";

	  social_id = "";
          social_type = "";
          if (this.state.politicians[i].posts && this.state.politicians[i].posts.length > 0) {
             social_id = this.state.politicians[i].posts[0].social_id;
             social_type = this.state.politicians[i].posts[0].social_type;
           } 
            
	    items.push(
              <ListGroupItem>
              <Row>
              <Col xs={3}>
                <Image src={this.state.politicians[i].avatar_thumb}></Image>
              </Col>
              <Col xs={7}>
                <p>{name}</p>
                <p>{this.state.politicians[i].state.name}</p>
              </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <h4>Latest Social Media</h4>

                  <LatestPost id={social_id}
                  type={social_type} />
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

export default PoliticianList;
