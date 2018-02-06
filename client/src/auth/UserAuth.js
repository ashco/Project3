import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
// MATERIAL UI
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const greyColor = '#dddddd';
const blueColor = '#A1D4E3';
const pinkColor = '#F98285';
const purpleColor = '#BD70B3';
const orangeColor = '#ffdabf';


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
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
      tab:{
        // color: pinkColor,
        backgroundColor: 'white',
        fontWeight: 600,
        color: '#FDFFFE',
        textTransform: 'capitalize'
      },
      contentStyle: {
				color: pinkColor,
				borderColor: pinkColor,
			},
      button: {
        color: '#444952',
        textTransform: 'capitalize',
        fontWeight: 400
      }
    };


		if(this.props.user){
      return (<Redirect to="/profile" />);
    }
		
		return (
      <div className="auth-container">
        <div className="UserAuth__box box">
          <Tabs
            value={this.state.value}
            // style={styles.tab}
            onChange={this.handleTabChange}
            inkBarStyle={{background: blueColor}}
          >
            <Tab label="Login" value="login" style={styles.tab}>
              <div>
                <h2 style={styles.headline}>Login</h2>
                <div>
                  <TextField 
                    name="email"
                    type="email"
                    floatingLabelText="Email"
                    fullWidth={true}
                    value={this.state.email}
                    underlineFocusStyle={styles.contentStyle}
                    floatingLabelStyle={styles.contentStyle}
                    floatingLabelFocusStyle={styles.contentStyle}
                    onChange={this.handleEmailChange}/>
                  <br/>
                </div>
                <div>
                  <TextField 
                    name="password"
                    type="password"
                    floatingLabelText="Password"
                    fullWidth={true}
                    value={this.state.password}
                    underlineFocusStyle={styles.contentStyle}
                    floatingLabelStyle={styles.contentStyle}
                    floatingLabelFocusStyle={styles.contentStyle}
                    onChange={this.handlePasswordChange}
                  />
                  <br/>
                </div>
                <br /><br />
                <RaisedButton 
                  label="Login" 
                  primary={false}
                  backgroundColor={blueColor}
                  style={styles.button} 
                  onClick={this.handleLoginSubmit} 
                />
              </div>
            </Tab>
            <Tab label="Sign Up" value="signup" style={styles.tab}>
              <div>
                <h2 style={styles.headline}>Sign Up</h2>
                <div>
                  <TextField 
                    name="name"
                    type="text"
                    floatingLabelText="Name"
                    fullWidth={true}
                    value={this.state.name}
                    floatingLabelStyle={styles.contentStyle}
                    floatingLabelFocusStyle={styles.contentStyle}
                    underlineFocusStyle={styles.contentStyle}
                    floatingLabelStyle={styles.contentStyle}
                    floatingLabelFocusStyle={styles.contentStyle}
                    onChange={this.handleNameChange}/><br 
                  />
                </div>
                <div>
                  <TextField 
                    name="email"
                    type="email"
                    floatingLabelText="Email"
                    fullWidth={true}
                    value={this.state.email}
                    underlineFocusStyle={styles.contentStyle}
                    floatingLabelStyle={styles.contentStyle}
                    floatingLabelFocusStyle={styles.contentStyle}
                    onChange={this.handleEmailChange}/>
                    <br />
                </div>
                <div>
                  <TextField 
                    name="password"
                    type="password"
                    floatingLabelText="Password"
                    fullWidth={true}
                    value={this.state.password}
                    underlineFocusStyle={styles.contentStyle}
                    floatingLabelStyle={styles.contentStyle}
                    floatingLabelFocusStyle={styles.contentStyle}
                    onChange={this.handlePasswordChange}/>
                  <br />
                </div>
                <br /><br />
                <RaisedButton 
                  label="Sign Up" 
                  primary={false} 
                  backgroundColor={blueColor}
                  style={styles.button} 
                  onClick={this.handleSignupSubmit} 
                />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}