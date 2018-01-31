import React, { Component } from 'react';
import Logout from '../auth/Logout.js';
import { Link } from 'react-router-dom';
// MATERIAL UI
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

class Nav extends Component {
  render(){
    let leftLinks = <span />;
    let rightLinks = <span />;
    
    if(this.props.user){
      leftLinks = (
        <span>
          <Link to="/"><ToolbarTitle text="DreamApp" /></Link>
          <Link to="/analyze"><ToolbarTitle text="Analyze" /></Link>
        </span>
      )
      rightLinks = (
        <span>
          <Link to="/dreamlog"><ToolbarTitle text="Dream Log" /></Link>
          <Link to="/profile"><ToolbarTitle text="Profile" /></Link>
          <ToolbarSeparator />
          <Logout updateUser={this.props.updateUser} />
        </span>
      );
    }
    else {
      leftLinks = (
        <span>
          <Link to="/"><ToolbarTitle text="DreamApp" /></Link>
          <Link to="/analyze"><ToolbarTitle text="Analyze" /></Link>
        </span>
      );
      rightLinks = (
        <span>
          <Link to="/login"><RaisedButton label="Login" primary={true} /></Link>
          <Link to="/signup"><RaisedButton label="Sign Up" primary={true} /></Link>
        </span>
      );
    }

    return(
      <Toolbar>
        {/* LEFT SIDE */}
        <ToolbarGroup firstChild={true}>
          {leftLinks}
        </ToolbarGroup>
        {/* RIGHT SIDE */}
        <ToolbarGroup lastChild={true}>
          {rightLinks}
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default Nav;
