import React, { Component } from 'react';
import moment from 'moment';
import Title from '../layout/Title.js';
import EditDream from './EditDream.js'
// MATERIAL UI
import RaisedButton from 'material-ui/RaisedButton';

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
		const dreamDate = moment(this.props.dream.date).format('MM DD, YYYY');   
	return(
		<div className="DreamKey__box box">
			<h3>{dreamDate}</h3>
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
