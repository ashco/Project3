import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { ToolbarTitle } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';


class Logout extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false
    }
  }
  handleLogout = (e) => {
    e.preventDefault();
    console.log('handle logout reached');
    //Delete token from local storage
    localStorage.removeItem('dreamToken');
    //Go back to home page
    this.props.updateUser();
    this.setState({ redirect: true });
  }

  render() {
    if(this.state.redirect){
      return (<Redirect to="/" />);
    }
    else {
      // return (
      // <Link to='/' onClick={this.handleLogout}>
      //   <ToolbarTitle text="Logout" />
      // </Link>);
      return(
        <MenuItem 
          primaryText="Logout"
          onClick={this.handleLogout}
          />
      );
    }
  }
}

export default Logout;
