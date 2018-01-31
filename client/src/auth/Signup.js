import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
// MATERIAL UI
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  }
  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  handleSubmit = (e) => {
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
    let form = '';
    if(this.props.user){
      return (<Redirect to="/profile" />);
    }
    else {
      form = (
        <div>
          <div>
            <TextField name="name"
                       type="text"
                       floatingLabelText="Name"
                       value={this.state.name}
                       onChange={this.handleNameChange}/><br />
          </div>
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
        {this.props.user ? <Redirect to="/profile" /> : ''}
      </div>
    );
  }
}

export default Signup;
