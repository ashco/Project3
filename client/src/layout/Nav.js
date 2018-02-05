import React, { Component } from 'react';
import Logout from '../auth/Logout.js';
import { Link } from 'react-router-dom';
// MATERIAL UI
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
//Half of this is unneccessary 
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Divider from 'material-ui/Divider';


class Nav extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false
    }
  }
  
  
  render(){
    let rightLinks = (
      <span>
        <Link to="/userauth" className="Nav__link">Login</Link>
      </span>
    );

    // YES USER
    if(this.props.user){
      rightLinks = (
        <span>
          <Link to="/log" className="Nav__link loggedIn">Dream Log</Link>
          <Link to="/profile" className="Nav__link loggedIn">Profile</Link>
          {/* User Dropdown */}
          <IconMenu 
            iconButtonElement={<IconButton touch={true}><NavigationExpandMoreIcon /></IconButton>} 
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText={`${this.props.user.name}`} />
            <Divider />
            <Link to="/analyze" className="Nav__mobile_link"><MenuItem primaryText="Analyze" /></Link>
            <Link to="/log" className="Nav__mobile_link"><MenuItem primaryText="Dream Log" /></Link>
            <Link to="/profile" className="Nav__mobile_link"><MenuItem primaryText="Profile" /></Link> 
            <Logout updateUser={this.props.updateUser} />
          </IconMenu>
        </span>
      );
    }

    return(
      <nav>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <span>
              <Link to="/" className="Nav__logo">Dreamstate</Link>
              <Link to="/analyze" className="Nav__link loggedIn">Analyze</Link>
            </span>
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            {rightLinks}
          </ToolbarGroup>
        </Toolbar>
      </nav>
    );
  }
}

export default Nav;