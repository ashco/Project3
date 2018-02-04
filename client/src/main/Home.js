import React, { Component } from 'react';
import Title from '../layout/Title.js';
import { Link } from 'react-router-dom';

class Home extends Component {
  render(){
    return (
      <div className="home">
        <Title text="dreamstate" style="Home__title" />
        <h2>Lorem ipsum about analyzing your dreams.</h2>
        <div className="login-box">
          <Link to="/analyze"><button className="primaryCTA">Analyze Your Dream</button></Link>
          <Link to="/userauth"><button className="secondaryCTA">Log In</button></Link>
        </div>
      </div>
    );
  }
}

export default Home;

