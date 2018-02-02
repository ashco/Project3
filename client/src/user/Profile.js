import React, { Component } from 'react';
import Title from '../layout/Title.js';
// Profile Components 
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

    let userId = this.props.user.id;
    let base = this;

    axios({
      method: 'get',
      url: '/profile/profile',
      params: {
        user: userId
      }
    }).then((result) => {
      console.log('result.data', result.data);

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
      })
    }).catch((error) => {
      console.log("An error occured while fetching data from databse", error.response ? error.response.data : 'No error.response.data');
    })
  }

  render(){
    const totalDreams = (this.state.data.length)
    console.log('totalDreams', totalDreams);

    // Logged in with data loaded
    if(this.props.user && this.props.user.name){
      return (
        <div>
          <Title text="Profile" style="Profile__title" />
          <h2>HELLO AGAIN {this.props.user.name}!</h2>
          <h4>Your email is {this.props.user.email}</h4>
          <SentimentTrends data={this.state.sentimentData} />
          <CallToAction />
          <OverallStats data={this.state.overallStats} totalDreams={totalDreams}/>
          <KeywordTrends data={this.state.keywordData}/>
        </div>
      );
    } 
    // NOT LOGGED IN
    else {
      return (
        <div>
          <Title text="Profile" style="Profile__title" />
          <p>This is a profile page. You need to be logged in to view it.</p>
        </div>
      );
    }
  }
}

export default Profile;
