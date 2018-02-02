import React, { Component } from 'react';
import Title from '../layout/Title.js';
import { Link } from 'react-router-dom';
// MATERIAL UI
import RaisedButton from 'material-ui/RaisedButton';

class Home extends Component {
  render(){

    const style = {
      margin: 12,
      background: '#BD70B3'
    };    

    return (
      <div className="home">
        <Title text="dream" style="Home__title" />
        <h2>Lorem ipsum about analyzing your dreams.</h2>
        <div className="login-box">
          <Link to="/userauth"><button className="primaryCTA">Analyze Your Dream</button></Link>
          <Link to="/analyze"><button className="secondaryCTA">Log In</button></Link>
        </div>
      </div>
    );
  }
}

export default Home;

