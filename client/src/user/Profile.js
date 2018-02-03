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
    let dashboard = null;
    console.log('totalDreams', totalDreams);

    if(totalDreams > 1) {
      dashboard = 
            <div>
                <SentimentTrends data={this.state.sentimentData} />
                <h1>{this.props.user.name}</h1>
                <CallToAction />
                <OverallStats data={this.state.overallStats} totalDreams={totalDreams}/>
                <KeywordTrends data={this.state.keywordData}/>
            </div>
    } else if (totalDreams <= 1){
      dashboard = 
          <div>
            <p> Enter more dreams to see your trends over time! </p>
            <CallToAction />
          </div>
    }
    

    // Logged in with data loaded
    if(this.props.user && this.props.user.name){
      return (
        <div>
          {dashboard}
        </div>
      )
    } 
    else {
      return (
        <div>
          <Title text="Profile" style="Profile__title" />
          <p>You need to be logged in to view this page.</p>
        </div>
      );
    }
  }
}

export default Profile;