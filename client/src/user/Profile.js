import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
// Profile Components
import Title from "../layout/Title.js";
import UserGreeting from "./profileComponents/UserGreeting.js";
import SentimentTrends from "./profileComponents/sentimentTrends.js";
import CallToAction from "./profileComponents/CallToAction.js";
import OverallStats from "./profileComponents/overallStats.js";
import KeywordTrends from "./profileComponents/KeywordTrends.js";
// Data Cleansing Functions
import {
  sentimentByDate,
  overallTrends,
  keywordStats,
} from "../scripts/profileDataCleansing.js";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sentimentData: [],
      overallStats: [],
      keywordData: [],
      mostDreams: "",
      dataState: false,
    };
  }

  findMostDreams = (overallStats) => {
    var mostDreamsArray = [];
    let dreamsToReview = overallStats.concat([overallStats]);
    //foreach didn't work, end up with one undefined at the end
    for (var i = 0; i <= 3; i++) {
      mostDreamsArray.push(dreamsToReview[i].percentOfTotal);
    }
    let mostDreamsIndex = mostDreamsArray.indexOf(Math.max(...mostDreamsArray));
    let mostDreams = dreamsToReview[mostDreamsIndex].sentiment;
    this.setState({
      mostDreams: mostDreams,
    });
  };

  componentDidMount() {
    if (!this.props.user || !this.props.user.id) {
      return <Redirect to="/" />;
    }

    let base = this;
    let userId = this.props.user.id;

    axios({
      method: "get",
      url: "/profile/profile",
      params: {
        user: userId,
      },
    })
      .then((result) => {
        // Retrieve user data
        let rawData = result.data;
        // Declare empty array to fill with user data
        let userData = [];
        // Push each elment of user data into
        rawData.forEach(function (data) {
          userData.push(data);
        });
        let sentimentData = sentimentByDate(userData);
        let overallStats = overallTrends(userData);
        let keywordData = keywordStats(userData);
        base.findMostDreams(overallStats);

        base.setState({
          data: userData,
          sentimentData: sentimentData,
          overallStats: overallStats,
          keywordData: keywordData,
          dataState: true,
        });

        // console.log("overallStats",this.state.overallStats);
      })
      .catch((error) => {
        // console.log("An error occured while fetching data from databse", error.response ? error.response.data : 'No error.response.data');
      });
  }

  render() {
    const totalDreams = this.state.data.length;
    let dashboard = null;

    if (totalDreams > 1) {
      dashboard = (
        <div>
          <SentimentTrends data={this.state.sentimentData} />
          <div className="Profile__grid">
            <UserGreeting
              name={this.props.user.name}
              totalDreams={totalDreams}
            />
            <CallToAction user={this.props.user.name} />
            <OverallStats
              data={this.state.overallStats}
              totalDreams={totalDreams}
            />
          </div>
          <h2 className="Profile__subhead">
            Your dreams are overall{" "}
            <span className={this.state.mostDreams}>
              {this.state.mostDreams}
            </span>
            .
          </h2>
          <KeywordTrends data={this.state.keywordData} />
        </div>
      );
    } else if (this.props.user && this.props.user.name && totalDreams <= 1) {
      dashboard = (
        <div className="Profile__grid">
          <UserGreeting name={this.props.user.name} totalDreams={totalDreams} />
          <CallToAction />
          <div className="Profile__box">
            <p> Enter more dreams to see your trends over time.</p>
          </div>
        </div>
      );
    }

    // Logged in with data loaded
    if (this.props.user && this.props.user.name) {
      return <div className="Profile">{dashboard}</div>;
    } else {
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
