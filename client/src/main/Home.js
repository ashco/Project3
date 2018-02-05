import React, { Component } from 'react';
import Title from '../layout/Title.js';
import { Link } from 'react-router-dom';

class Home extends Component {
  render(){
    let buttons = (
      <div className="login-box">
        <Link to="/analyze"><button className="primaryCTA">Analyze Your Dream</button></Link>
        <Link to="/userauth"><button className="secondaryCTA">Log In</button></Link>
      </div>
    );

    if(this.props.user){
      buttons = (
        <div className="login-box">
          <Link to="/analyze"><button className="primaryCTA">Analyze Your Dream</button></Link>
        </div>
      );
    }

    return (
      <div className="home">
        <Title text="dreamstate" style="Home__title" />
        <h2>Lorem ipsum about analyzing your dreams.</h2>
        {buttons}
      </div>
    );
  }
}

export default Home;

