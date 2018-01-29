import React, { Component } from 'react';
import Logout from '../auth/Logout.js';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render(){
    let links = <span />;
    if(this.props.user){
      links = (
        <span>
          <Link to="/profile">Profile</Link>
          <Logout updateUser={this.props.updateUser} />
        </span>);
    }
    else {
      links = (
        <span>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </span>);
    }

    return(
        <div>
          <nav className="nav">
            <a href="/">Home</a>
            {links}
          </nav>
        </div>
      );
  }
}

export default Nav;
