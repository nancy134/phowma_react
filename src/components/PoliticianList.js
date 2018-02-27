import React, { Component } from 'react';
import InfiniteScroll from './InfiniteScroll';
import Politicians from '../actions/Politicians';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {Row, Col} from 'reactstrap';
import {Media} from 'reactstrap';
import {Button} from 'reactstrap';
import LatestPost from '../components/LatestPost';
import FA from 'react-fontawesome';
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
        };
        this.onTwitter = this.onTwitter.bind(this);
        this.onFacebook = this.onFacebook.bind(this);
    }

    loadItems(page) {
      console.log("PoliticianList:loadItems page: "+page);
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
      console.log("PoliticianList:componentWillReceiveProps: newProps: "+JSON.stringify(newProps));
      this.scroll.pageLoaded = 0;
      this.setState({isRestart: true,
                     hasMoreItems: true,
                     politicians: [],
                     state_id: newProps.state_id,
                     district_id: newProps.district_id});
    }
    onTwitter(param,e){
      window.open(param);
    }
    onFacebook(param,e){
      window.open(param);
    }
    render() {
        console.log("PoliticianList:render()");
        const loader = <div className="loader">Loading ...</div>;
        var items = [];
        var name = "";
        var social_id = "";
        var social_type = "";
        this.state.politicians.forEach((politician, i) => {
          name = "";
          if (this.state.politicians[i].position === "senator")
            name = "Senator ";
          else if (this.state.politicians[i].position === "representative")
            name = "Representative ";
          else if (this.state.politicians[i].position === "governor")
            name = "Governor ";

          name = name + this.state.politicians[i].first_name + " " + this.state.politicians[i].last_name;
          if (this.state.politicians[i].party === "democrat")
            name = name + " (D)";
          else if (this.state.politicians[i].party === "republican")
            name = name + " (R)";

	  social_id = "";
          social_type = "";
          if (this.state.politicians[i].posts && this.state.politicians[i].posts.length > 0) {
             social_id = this.state.politicians[i].posts[0].social_id;
             social_type = this.state.politicians[i].posts[0].social_type;
           }
           var district = ""; 
           if (this.state.politicians[i].district){
             if (this.state.politicians[i].district.number === 0)
               district = this.state.politicians[i].district.name
             else 
               district = this.state.politicians[i].district.name+" Congressional District" 
           }
           var twitter = "";
           var facebook = "";
           if (this.state.politicians[i].twitter && this.state.politicians[i].twitter !== "")
             twitter = <Button color="link" onClick={(e) => this.onTwitter("http://www.twitter.com/"+this.state.politicians[i].twitter,e)}> <FA size="2x" name="twitter" /></Button>
           if (this.state.politicians[i].facebook && this.state.politicians[i].facebook !== "")
             facebook = <Button color="link" onClick={(e) => this.onFacebook("http://www.facebook.com/"+this.state.politicians[i].facebook,e)}><FA size="2x" name="facebook" /></Button>
	    items.push(
              <ListGroupItem>
              <Row>
              <Col xs={3}>
                <Media object src={this.state.politicians[i].avatar_thumb}/>
              </Col>
              <Col xs={9}>
                <p className="font-weight-bold my-0">{name}</p>
                <p className="font-weight-light my-0">{this.state.politicians[i].state.name} {district}</p>
                <div className="float-right">
                {twitter}
                {facebook}
                </div>
              </Col>
              </Row>
              <Row>
                <Col xs={12}>
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
