import React, { Component } from 'react';
import Title from '../layout/Title.js';
// Profile Components 
import UserGreeting from './profileComponents/UserGreeting.js'
import SentimentTrends from './profileComponents/sentimentTrends.js'
import CallToAction from './profileComponents/CallToAction.js'
import OverallStats from './profileComponents/overallStats.js'
import KeywordTrends from './profileComponents/KeywordTrends.js'

import axios from 'axios';
// Data Cleansing Functions
import {sentimentByDate, overallTrends, keywordStats} from '../scripts/profileDataCleansing.js'

class Profile extends Component {
  constructor(props){
  super(props);
    this.state = {
      data: [],
      sentimentData: [],
      overallStats: [],
      keywordData: [],
      dataState: false
    }
  }

  componentDidMount(){
    if(!this.props.user || !this.props.user.id){
      return;
    }

    let base = this;
    let userId = this.props.user.id;

    axios({
      method: 'get',
      url: '/profile/profile',
      params: {
        user: userId
      }
    }).then((result) => {
      // Retrieve user data
      let rawData = result.data;
      // Declare empty array to fill with user data
      let userData = [];
      // Push each elment of user data into 
      rawData.forEach(function(data){userData.push(data)});
      let sentimentData = sentimentByDate(userData);
      let overallStats = overallTrends(userData);
      let keywordData = keywordStats(userData);

      base.setState({
        data: userData,
        sentimentData: sentimentData,
        overallStats: overallStats,
        keywordData: keywordData,
        dataState: true
      });
    }).catch((error) => {
      console.log("An error occured while fetching data from databse", error.response ? error.response.data : 'No error.response.data');
    });
  }

  render(){
    const totalDreams = (this.state.data.length)
    let dashboard = null; 
    var mostDreamsIndex = this.state.overallStats.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    var mostDreamsCategory;
    
    if(mostDreamsIndex == 0) {
      mostDreamsCategory = "neutral";
    } 
    else if(mostDreamsIndex == 1) {
      mostDreamsCategory = "positive";
    } 
    else if(mostDreamsIndex == 2) {
      mostDreamsCategory = "negative";
    } 
    else if(mostDreamsIndex == 3) {
      mostDreamsCategory = "mixed";
    }

    if(totalDreams > 1) {
      dashboard = 
            <div>
                <SentimentTrends data={this.state.sentimentData} />
                <div className="Profile__grid">
                  <UserGreeting name={this.props.user.name} totalDreams={totalDreams} />
                  <CallToAction user={this.props.user.name} />
                  <OverallStats data={this.state.overallStats} totalDreams={totalDreams} />
                </div>
                <h2 className="Profile__subhead">Your dreams are overall <span className={mostDreamsCategory}>{mostDreamsCategory}</span>.</h2>
                <KeywordTrends data={this.state.keywordData} />
            </div>
    } 
    else if (totalDreams <= 1){
      dashboard = 
            <div className="Profile__grid">
              <UserGreeting name={this.props.user.name} totalDreams={totalDreams} />
              <CallToAction />
              <div className="Profile__box">
                <p> Enter more dreams to see your trends over time.</p>
              </div>
            </div>
    }
    

    // Logged in with data loaded
    if(this.props.user && this.props.user.name){
      return (
        <div className="Profile">
          {dashboard}
        </div>
      );
    } 
    else {
      return (
        <div className="Profile">
          <Title text="Profile" style="Profile__title" />
          <p>You need to be logged in to view this page.</p>
        </div>
      );
    }
  }
}

export default Profile;