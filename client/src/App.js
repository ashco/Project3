// REACT
import React, { Component } from 'react';
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
import UserAuth from './auth/UserAuth.js';
// CUSTOM ROUTES
import Analyze from './input/Analyze.js';
import DreamLog from './user/DreamLog.js';
// STYLE
import './style/App.css';
// MATERIAL UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      selected_dream_data: {}
    }

    this.handleGet = this.handleGet.bind(this);
  }

  // FNC POPULATES STATE FOR SELECTED DREAM
  handleGet = (dream_data) => { 
    this.setState({ selected_dream_data: dream_data }

    //Start of redirect link
    , () => {
      this.props.history.push({
        pathname: '/analyze',
      });
    }
  );

  componentDidMount = () => {
    this.getUser();
  }

  getUser = () => {
    let token = localStorage.getItem('dreamToken');

    if (token === 'undefined' || token === null || token === '' || token === undefined) {
      localStorage.removeItem('dreamToken');
      this.setState({
        token: '',
        user: null
      });
    } 
    else {
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
      });
    }
  }

  updateUser = () => {
    this.getUser();
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
        <MuiThemeProvider>
          <Router>
            <div>
              <Nav user={this.state.user} updateUser={this.getUser} />
              <div className="space">
                <Flash flashType={this.state.flashType} flash={this.state.flash} setFlash={this.setFlash} cancelFlash={this.cancelFlash} />
                <Route exact path="/" component={
                  () => (<Home user={this.state.user} />)} />
                <Route path="/userauth" component={
                  () => (<UserAuth user={this.state.user} setFlash={this.setFlash} updateUser={this.updateUser} />)} />
                <Route path="/profile" component={
                  () => (<Profile user={this.state.user} setFlash={this.setFlash} />)} />
                <Route path="/analyze" component={
                  () => (<Analyze user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
                <Route path="/log" component={
                  () => (<DreamLog user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} handleGet={this.handleGet} />)} />
                <Footer />
              </div>
            </div>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
