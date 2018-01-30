import React, { Component } from 'react';
import Title from '../layout/Title.js';

class Profile extends Component {
  render(){
    // LOGGED IN
    if(this.props.user && this.props.user.name){
      return (
        <div>
          <Title text="Profile" style="Profile__title" />
          <h2>HELLO AGAIN {this.props.user.name}!</h2>
          <h4>Your email is {this.props.user.email}</h4>
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
