import React, { Component } from 'react';
import Title from '../layout/Title.js';
import axios from 'axios';

class Form extends Component {
	constructor(props){
		super(props);
		this.state = {
			date: '',
			content: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleChange = (event) => {
		this.setState({[event.target.name]:event.target.value})
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.handleInput(this.state.date, this.state.content)
		//clear state of date and content
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
