import React, { Component } from 'react';
import axios from 'axios';
import Title from '../layout/Title.js';
import Form from './Form.js';
import DreamResult from './DreamResult.js'

class Analyze extends Component {
	constructor(props){
		super(props);
		this.state = {
			date: '',
			content: '',
			data: '',
			display: ''
		}

		
		this.handleInput = this.handleInput.bind(this);
	}

	// function to handle for input
	// input is from handleSUbmit in the form component 
	// axios call and state update at the end of this function

	handleInput = (date, content) => {
		let base = this;

		axios.post('/dream', {
			date: date,
			content: content,
			user: base.props.user
		}).then((result) => {
			console.log('dream post results', result);
			base.setState({
				date: date,
				content: content,
				data: result
			})
		}).catch((error) => {
			console.log('error returned', error.response.data);
		});

	}

	// handleSubmit = (event) => {
	// 	event.preventDefault();

	// }

  render(){
    return(
			<div>
				<Form handleInput={this.handleInput} />
				Form or Result will be toggled into this div
				<DreamResult />
			</div>
		);
  }
}

export default Analyze;
