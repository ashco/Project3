import React, { Component } from 'react';
import Logout from '../auth/Logout.js';
import { Link } from 'react-router-dom';
// MATERIAL UI
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

//Half of this is unneccessary 
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Divider from 'material-ui/Divider';
import FontAwesome from 'react-fontawesome';


const UserIcon = () => { return (<i className="fas fa-user" />) }


class Nav extends Component {
  // LOGOUT FUNCTION
  handleLogout = (e) => {
    e.preventDefault();
    //Delete token from local storage
    localStorage.removeItem('dreamToken');
    //Go back to home page
    this.props.updateUser();
  }
  
  render(){
    const style = {
      margin: 8,
    }; 

    let leftLinks = <span />;
    let rightLinks = <span />;
    
    // YES USER
    if(this.props.user){
      leftLinks = (
        <span>
          <Link to="/"><ToolbarTitle text="DreamApp" /></Link>
          <Link to="/analyze"><ToolbarTitle text="Analyze" /></Link>
        </span>
      )
      rightLinks = (
        <span>
          <Link to="/log"><ToolbarTitle text="Dream Log" /></Link>
          <Link to="/profile"><ToolbarTitle text="Profile" /></Link>
          {/* <ToolbarSeparator /> */}
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                {/* <FontAwesome className='super-crazy-colors'
                             name='rocket'
                             size='2x'
                             spin
                             style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }} */}
                             {/* /> */}
                <NavigationExpandMoreIcon />
              </IconButton>
            } 
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText={`Hello, ${this.props.user.name}`} />
            <Divider />
            <MenuItem primaryText="Logout" 
                      onClick={this.handleLogout} 
                      />
          </IconMenu>
        </span>
      );
    }
    // NO USER
    else {
      leftLinks = (
        <span>
          <Link to="/"><ToolbarTitle text="DreamApp" /></Link>
          <Link to="/analyze"><ToolbarTitle text="Analyze" /></Link>
        </span>
      );
      rightLinks = (
        <span>
          <Link to="/userauth"><RaisedButton label="Login" primary={true} style={style} /></Link>
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
