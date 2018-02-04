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

	handleContentChange = (event, content) => {
		this.setState({content: content,
    });
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
					{/* DATE */}
					<DatePicker hintText="Dream date"
											name="date"
											// mode="landscape"
											fullWidth={true}
        							value={this.state.date}
        							onChange={this.handleDateChange} />
					{/* TEXT */}
					<TextField name="content"
										//  errorText="This field is required"

										//  floatingLabelText="Text"
										 multiLine={true}
										 fullWidth={true}
      							 rows={10}
										 onChange={this.handleContentChange} />
					<RaisedButton label="Submit" primary={true} onClick={this.handleSubmit} />
				</div>
			</div>
		);
  }
}

export default Form;