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
		this.editDream = this.editDream.bind(this);
	}

	editDream = () => {
		console.log(this.props.dream._id,"is the id we get from edit submission button");
		// this.props.handleEdit(this.props.dream._id);
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
	        							value={this.props.dream.date} />
						{/* TEXT */}
						<TextField name="content"
											floatingLabelText="Text"
											multiLine={true}
											fullWidth={true}
	      							 		rows={10}
	      							 		value={this.props.dream.content} />
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
	}

	deleteDream = () => {
		this.props.handleDelete(this.props.dream._id);
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
			<EditDream dream={this.props.dream} editing={this.state.editing} />
		</div>
	)
	}
}

export default DreamEntry;
