import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import Title from '../layout/Title.js';
// MATERIAL UI
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class EditDream extends Component{
	constructor(props){
		super(props);
		this.state = {
			date: this.props.dream.date,
			content: this.props.dream.content
		}
		this.editDream = this.editDream.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleDateChange = (event, date) => {
    	this.setState({date: date,
    });
  };

	handleContentChange = (event, content) => {
		this.setState({content: content,
    });
  }

	handleChange = (event) => {
		this.setState(
			{[event.target.name]: event.target.value}
		)
		console.log(this.state);
	}

	editDream = (event) => {
		event.preventDefault();
		console.log(this.state.date,this.state.content,"EditDream form component");
		this.props.editDream(this.state.date, this.state.content);
	}

	render(){
		if(this.props.editing) {
			return(
				<div className="Form">
					<div className="Form__box box">
						{/* DATE */}
						<DatePicker hintText="Dream date"
												name="date"
												// mode="landscape"
												fullWidth={true}
										onChange={this.handleDateChange} 
	        							value={this.state.date} />
						{/* TEXT */}
						<TextField name="content"
											floatingLabelText="Text"
											multiLine={true}
											fullWidth={true}
	      							 		rows={10}
	      							 		onChange={this.handleContentChange} 
	      							 		value={this.state.content} />
						<RaisedButton label="Edit" primary={true} onClick={this.editDream} />
					</div>
				</div>
			)
		}
		else {
			return (
				<span></span>
			);
		}
	}
}

class DreamEntry extends Component{
	constructor(props){
		super(props);
		this.state = {
			editing: false
		}
		this.deleteDream = this.deleteDream.bind(this);
		this.toggleEditDream = this.toggleEditDream.bind(this);
		this.editDream = this.editDream.bind(this);
	}

	deleteDream = () => {
		this.props.handleDelete(this.props.dream._id);
	}

	editDream = (date, content) => {
		console.log("Dream entry component edit",date, content);
		this.props.handleEdit(this.props.dream._id, date, content);
		this.toggleEditDream();
	}

	toggleEditDream = () => {
		console.log("Toggle");
		if(this.state.editing) {
			this.setState({
				editing: false
			})
		}
		else {
			this.setState({
				editing: true
			})
		}		
	}

	render(){
	return(
		<div className="DreamKey__box box">
			<h3>{this.props.dream.date}</h3>
			<h5>{this.props.dream.sentiment}</h5>
			<p>{this.props.dream.content}</p>
			<p>
				<button type="button" onClick={this.deleteDream}>Delete</button>
				<button type="button" onClick={this.toggleEditDream}>Edit</button>
			</p>
			<EditDream editDream={this.editDream} dream={this.props.dream} editing={this.state.editing} />
		</div>
	)
	}
}

export default DreamEntry;
