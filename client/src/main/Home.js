import React, { Component } from 'react';
import Title from '../layout/Title.js';
import { Link } from 'react-router-dom';
// MATERIAL UI
import RaisedButton from 'material-ui/RaisedButton';


class Home extends Component {
  render(){

    const style = {
      margin: 12,
    };    

    return (
        <div className="home">

          <Title text="Dream Home Page" style="Home__title" />

          <div className="login-box">
            
            <Link to="/login"><RaisedButton label="Login" primary={true} style={style} /></Link>
            <Link to="/signup"><RaisedButton label="Sign Up" primary={true} style={style} /></Link>
          </div>
        </div>
    );
  }
}

export default Home;

