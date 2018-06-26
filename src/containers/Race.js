import React, { Component } from 'react';
import "./Race.css"
import Campaigns from '../actions/Campaigns';
import FA from 'react-fontawesome';
import { Button } from 'reactstrap';
import LatestPost from '../components/LatestPost';
import FacebookProvider, { Page } from 'react-facebook';
import { Timeline } from 'react-twitter-widgets';

export default class Race extends Component {
  constructor(props) {
    super(props)
    console.log("Race:props: "+JSON.stringify(props));

    this.state = {
      campaigns: null
    }
  }

  componentDidMount(){
    Campaigns.index('q[election_date_eq]=&q[election_office_state_id_eq]=43&q[election_office_position_eq]=0', (campaigns) => {
      console.log("campaigns: "+JSON.stringify(campaigns));
      this.setState({campaigns: campaigns});
    });
  }
  render() {
    console.log("Race:render()");
    if (this.state.campaigns){
      var position = "";
      if (this.state.campaigns[0].election.office.position === "senator")
        position = "US Senate";
      else if (this.state.campaigns[0].election.office.position === "representative")
        position = "US House of Representatives"

    return ([
    <div class="container">

      <h1 class="my-4">{this.state.campaigns[0].election.office.state.name} {position}</h1>

      <div class="row">
        <div class="col-lg-6 portfolio-item">
          <div class="card h-100">
            <a href="#"><img id="p-image" class="card-img-top" src={this.state.campaigns[0].politician.avatar_medium} alt=""/></a>
            <div class="card-body">
              <h4 class="card-title">
                <a href="#">{this.state.campaigns[0].politician.first_name} {this.state.campaigns[0].politician.last_name} ({this.state.campaigns[0].politician.party})</a>
              </h4>
              <div>
                <FacebookProvider appId="1075987872547151">
                  <Page href="https://www.facebook.com/SenatorTedCruz"
                  tabs='timeline'
                  hideCover='true'
                  hideCTA='true'
                  smallHeader='true'/>
                </FacebookProvider>

              </div>
              <div>
                <Timeline
                  dataSource={{
                    sourceType: 'profile',
                    screenName: 'SenTedCruz'
                  }}
                  options={{
                    username: 'SenTedCruz',
                    height: '400'
                  }}
                  onLoad={() => console.log('Timeline is loaded!')}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 portfolio-item">
          <div class="card h-100">
            <a href="#"><img id="p-image" class="card-img-top" src={this.state.campaigns[1].politician.avatar_medium} alt=""/></a>
            <div class="card-body">
              <h4 class="card-title">
                <a href="#">{this.state.campaigns[1].politician.first_name} {this.state.campaigns[1].politician.last_name} ({this.state.campaigns[1].politician.party})</a>
              </h4>
              <div>
                <FacebookProvider appId="1075987872547151">
                  <Page href="https://www.facebook.com/betoorourke"
                  tabs='timeline'
                  hideCover='true'
                  hideCTA='true'
                  smallHeader='true'/>
                </FacebookProvider>
              </div>              
            </div>
          </div>
        </div>
      </div>
    </div>
    ]);
    } else {
      return([
        <p>Loading...</p>
      ]);
    }
  }
}
