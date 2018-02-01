import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
// COMPONENTS
import Title from '../layout/Title.js';
// MATERIAL UI
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class UserAuth extends Component {

  constructor(props) {
    super(props);
    this.state = {
			email: '',
      password: '',
      value: 'login'
    };
  }

  handleTabChange = (value) => {
    this.setState({
      value: value,
    });
	};
	
	handleNameChange = (e) => {
    this.setState({name: e.target.value})
  }

	handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }

	handleLoginSubmit = (e) => {
    e.preventDefault();
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then((result) => {
      localStorage.setItem('dreamToken', result.data.token);
      this.setState({ success: true });
      this.props.updateUser();
    }).catch((error) => {
      console.log('error returned', error.response.data);
      this.props.setFlash('error', error.response.status + ': ' + (error.response.data && error.response.data.error ? error.response.data.message : error.response.statusText));
    });
  }

	handleSignupSubmit = (e) => {
    e.preventDefault();
    axios.post('/auth/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }).then(result => {
      localStorage.setItem('dreamToken', result.data.token);
      this.props.updateUser();
    }).catch(error => {
      console.log(error.response);
      this.props.setFlash('error', error.response.status + ': ' + (error.response.data && error.response.data.error ? error.response.data.message : error.response.statusText));
    })
  }

  render() {
	
		if(this.props.user){
			// console.log('User', this.props.user)
      return (<Redirect to="/profile" />);
    }
		
		return (
			// console.log('No user', this.props.user)
      <Tabs
				className="UserAuth__box"
        value={this.state.value}
        onChange={this.handleTabChange}>
        <Tab label="Login" value="login">
          <div>
            <h2 style={styles.headline}>Login</h2>
            <div>
							<TextField name="email"
												type="email"
												floatingLabelText="Email"
												fullWidth={true}
												value={this.state.email}
												onChange={this.handleEmailChange}/><br />
						</div>
						<div>
							<TextField name="password"
												type="password"
												floatingLabelText="Password"
												fullWidth={true}
												value={this.state.password}
												onChange={this.handlePasswordChange}/><br />
						</div>
						<RaisedButton label="Login" primary={true} onClick={this.handleLoginSubmit} />
          </div>
        </Tab>
        <Tab label="Sign Up" value="signup">
          <div>
            <h2 style={styles.headline}>Sign Up</h2>
            <div>
							<TextField name="name"
												type="text"
												floatingLabelText="Name"
												fullWidth={true}
												value={this.state.name}
												onChange={this.handleNameChange}/><br />
						</div>
						<div>
							<TextField name="email"
												type="email"
												floatingLabelText="Email"
												fullWidth={true}
												value={this.state.email}
												onChange={this.handleEmailChange}/><br />
						</div>
						<div>
							<TextField name="password"
												type="password"
												floatingLabelText="Password"
												fullWidth={true}
												value={this.state.password}
												onChange={this.handlePasswordChange}/><br />
						</div>
						<RaisedButton label="Login" primary={true} onClick={this.handleSignupSubmit} />
          </div>
        </Tab>
      </Tabs>
    );
  }
}