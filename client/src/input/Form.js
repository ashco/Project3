import React, { Component } from 'react';
import Title from '../layout/Title.js';
import axios from 'axios';
// MATERIAL UI
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';



class Form extends Component {
	constructor(props){
		super(props);
		this.state = {
			date: '',
			content: ''
		}


		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleContentChange = this.handleContentChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleDateChange = (event, date) => {
    this.setState({date: date,
    });
  };

	handleContentChange = (event) => {
		// console.log(this.state);
		// console.log(event);
		this.setState({content:event.target.value})
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
				<div className="Form__box box">
				{/* <form className="Form__box box" onSubmit={this.handleSubmit}> */}
					{/* DATE */}
					<DatePicker hintText="Dream date"
											name="date"
											mode="landscape"
        							value={this.state.date}
        							onChange={this.handleDateChange} />
					{/* TEXT */}
					<TextField name="content"
										 floatingLabelText="Text"
      							 multiLine={true}
      							 rows={10}
										 onChange={this.handleContentChange} />

					{/* <textarea name="content" cols="30" rows="10" onChange={this.handleChange}/> */}
					{/* <input className="Form__btn" type="submit"/> */}
					<RaisedButton label="Submit" primary={true} onClick={this.handleSubmit} />
				{/* </form> */}
				</div>
			</div>
		);
  }
}

export default Form;
