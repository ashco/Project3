// REACT
import React, { Component } from 'react';
// STYLE
import './style/App.css';
// MODULES
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Flash from './layout/Flash.js';
// MAIN PAGES
import Home from './main/Home.js';
import Profile from './user/Profile.js';
// LAYOUT
import Nav from './layout/Nav.js';
import Footer from './layout/Footer.js';
// AUTH
import Login from './auth/Login.js';
import Signup from './auth/Signup.js';
// CUSTOM ROUTES
import Form from './main/Form.js';
import DreamLog from './user/DreamLog.js';
import DreamResult from './main/DreamResult.js';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {}
    }
  }
  componentDidMount = () => {
    this.getUser();
  }

  getUser = () => {
    // If there is a token in localStorage
    let token = localStorage.getItem('dreamToken');
    if (token === 'undefined' || token === null || token === '' || token === undefined) {
      localStorage.removeItem('dreamToken');
      this.setState({
        token: '',
        user: null
      });
    } else {
      //   Validate the token against the server
      axios.post('/auth/me/from/token', {
        token: token
      }).then(response => {
        //   Store the token and user
        localStorage.setItem('dreamToken', response.data.token);
        this.setState({
          token: response.data.token,
          user: response.data.user
        });
        //   Pass User into child components and display main app
      }).catch(err => {
        // Both the JWT and db errors will be caught here
        console.log('cdm', err);
        this.setState({
          token: '',
          user: null
        });
      })
    }
  }

  setFlash = (t, msg) => {
    this.setState({
      flash: msg,
      flashType: t
    });
  }

  cancelFlash = () => {
    this.setState({
      flash: '',
      flashType: ''
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav user={this.state.user} updateUser={this.getUser} />
            <div className="space">
              <Flash flashType={this.state.flashType} flash={this.state.flash} setFlash={this.setFlash} cancelFlash={this.cancelFlash} />
              <Route exact path="/" component={Home} />
              <Route path="/login" component={
                () => (<Login user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
              <Route path="/signup" component={
                () => (<Signup user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
              <Route path="/profile" component={
                () => (<Profile user={this.state.user} setFlash={this.setFlash} />)} />
              {/* CUSTOM ROUTES */}
              <Route path="/dreamlog" component={DreamLog} />
              <Route path="/dreamresult" component={DreamResult} />
              <Route path="/form" component={
                () => (<Form user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />

            </div>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
