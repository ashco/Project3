import React, { Component } from 'react';
import axios from 'axios';
import Title from '../layout/Title.js';
import Form from './Form.js';
import DreamResult from './DreamResult.js';
import Loading from './Loading.js';

class Analyze extends Component {
	constructor(props){
		super(props);
		this.state = {
			date: '',
			content: '',
			data: '',
			display: 'form'
		}
		
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput = (date, content) => {
		let base = this;

		base.setState({display: 'loading'});

		axios.post('/dream', {
			date: date,
			content: content,
			user: base.props.user
		}).then((result) => {
			console.log('dream post results', result);
			base.setState({
				date: date,
				content: content,
				data: result,
				display: 'result'
			})
		}).catch((error) => {
			console.log('error returned', error.response.data);
		});
	}



  render(){
  	console.log('this state', this.state);
  	const displayState = this.state.display;
  	let display = null;

  	if(displayState === 'form'){
	  display = <Form handleInput={this.handleInput} />
  	} else if (displayState === 'loading') {
  		display = <Loading />
  	}
  	else if (displayState === 'result') {
	  	display = <DreamResult analysis = {this.state.data}/>
  	}
  	return (
  		<div className="content__box">
  			{display}
  		</div>
  	)
  }
}

export default Analyze;
