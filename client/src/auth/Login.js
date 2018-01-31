import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
// MATERIAL UI
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailChange = (e) => {
    console.log(e)
    console.log(this.state)
    this.setState({email: e.target.value});
  }

  handlePasswordChange = (e) => {
      console.log(e)
      console.log(this.state)
    this.setState({password: e.target.value});
  }

  handleSubmit = (e) => {
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

  render() {
    let form = '';
    if(this.props.user){
      return (<Redirect to="/profile" />);
    }
    else {
      form = (
        <div>
          <div>
            <TextField name="email"
                       type="email"
                       floatingLabelText="Email"
                       value={this.state.email}
                       onChange={this.handleEmailChange}/><br />
          </div>
          <div>
            <TextField name="password"
                       type="password"
                       floatingLabelText="Password"
                       value={this.state.password}
                       onChange={this.handlePasswordChange}/><br />
          </div>
          <RaisedButton label="Login" primary={true} onClick={this.handleSubmit} />
        </div>
      );
    }
    return (
      <div>
        {form}
      </div>
    );
  }
}

export default Login;
