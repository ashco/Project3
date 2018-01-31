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
			data: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = (event) => {
		this.setState({[event.target.name]:event.target.value})
	}

	handleSubmit = (event) => {
		event.preventDefault();
		let base = this;
		axios.post('/dream', {
			date: base.state.date,
			content: base.state.content,
			user: base.props.user
		}).then((result) => {
			console.log('dream post results', result);
			base.setState({
				data: result
			})
		}).catch((error) => {
			console.log('error returned', error.response.data);
		});
	}

  render(){
    return(
			<div>
				<Form handleSubmit={this.handleSumbit} handleChange={this.handleChange} />
				Form or Result will be toggled into this div
				<DreamResult />
			</div>
		);
  }
}

export default Analyze;
