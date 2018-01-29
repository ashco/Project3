import React, { Component } from 'react';

class Home extends Component {
  render(){
    return (
        <div className="home">
          <h1 className="hero">Dream Home Page</h1>
          <div className="login-box">
            <a href="#" className="home__btn--signup">Signup</a>
            <a href="#" className="home__btn--login">Login</a>
          </div>
        </div>
    );
  }
}

export default Home;

