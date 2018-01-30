import React, { Component } from 'react';
import Title from '../layout/Title.js';
import axios from 'axios';

class Form extends Component {
	constructor(props){
		super(props);
		this.state = {
			date: '2018-01-30',
			content: ''
		}
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
		}).catch((error) => {
			console.log('error returned', error.response.data);
		});
	}


  render(){
    return(
			<div className="Form">
				<Title text="Have you been dreaming?"  style="Form__title"/>

				<form className="Form__box box" onSubmit={this.handleSubmit}>
					<input name="date" type="date" onChange={this.handleChange}/>
					<textarea name="content" cols="30" rows="10" onChange={this.handleChange}/>
					<input className="Form__btn" type="submit"/>
				</form>
			</div>
		);
  }
}

export default Form;
