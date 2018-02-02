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
import Login from './auth/Login.js';
import Signup from './auth/Signup.js';
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

  // fetchDreams = () => {
	// 	// let userId = this.props.user.id;
	// 	// let base = this;	
		
	// 	axios({
	// 		method: 'get',
	// 		url: '/user/log',
	// 		params: {
	// 			user: userId
	// 		}
	// 	}).then((result) => {
	// 		console.log(result);
	// 		let rawData = result.data.concat([result]);
	// 		let foundDreams = sortbyDate(rawData);
	// 		// let foundDreams = result.data.concat([result]);
	// 		base.setState({
	// 			dreams: foundDreams,
	// 			dreamState: true
	// 		});

	// 		console.log("State",base.state.dreams);
	// 	}).catch((error) => {
	// 		console.log("An error occured",error.response.data);
	// 	})
	// }

  handleGet = (dream_data) => { 
    // this.setState({ 
    //   selected_dream_id: dream_id
    // });
    // console.log('((((((((((((((((((((this is this:', this);
    // console.log('State:', this.state);
    console.log('Value:', dream_data);
  // } 
    
    
    
    
    // // GET REQUIRED VARIABLES FOR AXIOS CALL
    // let _id = this.props.dream._id;
    // console.log('_id:', _id)
    // let base = this;
    // let dreamURL = '/dream/' + dream_id;
    // // AXIOS STUFF
    // axios({
		// 	method: 'get',
		// 	url: dreamURL,
		// 	params: {
		// 		the_id: _id
		// 	}
		// }).then((result) => {
    //   console.log('Result: ', result);
    // }).catch((error) => {
		// 	console.log('error returned:', error.response.data);
    // });
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
        <MuiThemeProvider>
          <Router>
            <div>
              <Nav user={this.state.user} updateUser={this.getUser} />
              <div className="space">
                <Flash flashType={this.state.flashType} flash={this.state.flash} setFlash={this.setFlash} cancelFlash={this.cancelFlash} />
              
                <Route exact path="/" component={Home} />
                {/* <Route path="/login" component={
                  () => (<Login user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} /> */}
                <Route path="/userauth" component={
                  () => (<UserAuth user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
                {/* <Route path="/signup" component={
                  () => (<Signup user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} /> */}
                <Route path="/profile" component={
                  () => (<Profile user={this.state.user} setFlash={this.setFlash} />)} />
                {/* CUSTOM ROUTES */}
                <Route path="/analyze" component={
                  () => (<Analyze user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
                <Route path="/log" component={
                  () => (<DreamLog user={this.state.user} handleGet={this.handleGet} setFlash={this.setFlash} updateUser={this.getUser} />)} />
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
