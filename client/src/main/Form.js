import React, { Component } from 'react';

class Form extends Component {
	constructor(props){
		super(props);
		this.state = {
			date: '',
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
			<div className="form">
				<h1>This is the Form!</h1>
				<form onSubmit={this.handleSubmit}>
					<input name="date" type="date" onChange={this.handleChange}/>
					<textarea name="content" cols="30" rows="10" onChange={this.handleChange}/>
					<input type="submit"/>
				</form>
			</div>
		);
  }
}

export default Form;
