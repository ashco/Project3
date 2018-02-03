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
		this.getDream = this.getDream.bind(this);
		this.editDream = this.editDream.bind(this);
		this.deleteDream = this.deleteDream.bind(this);
		this.toggleEditDream = this.toggleEditDream.bind(this);
	}

	getDream = () => {
		this.props.handleGet(this.props.dream);
	}

	editDream = (date, content) => {
		console.log("Dream entry component edit",date, content);
		this.props.handleEdit(this.props.dream._id, date, content);
		this.toggleEditDream();
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
		const dreamDate = moment(this.props.dream.date).format('MMMM D, YYYY');   
	return(
		<div className="DreamKey__box box">
			<h3>{dreamDate}</h3>
			<h5 className={this.props.dream.sentiment}>{this.props.dream.sentiment}</h5>
			<p>{this.props.dream.content}</p>
			<p>
				<button type="button" onClick={this.getDream}>View</button>
				<button type="button" onClick={this.toggleEditDream}>Edit</button>
				<button type="button" onClick={this.deleteDream}>Delete</button>
			</p>
			<EditDream editDream={this.editDream} dream={this.props.dream} editing={this.state.editing} />
		</div>
	)
	}
}

export default DreamEntry;
