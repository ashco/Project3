import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class DreamEntry extends Component{
	constructor(props){
		super(props);
		this.deleteDream = this.deleteDream.bind(this);
	}

	deleteDream = () => {
		console.log(this.props.dream._id,"is the id we get from button");
		this.props.handleDelete(this.props.dream._id);
	}

	render(){
	return(
		<div className="DreamKey__box box">
			<h3>{this.props.dream.date}</h3>
			<h5>{this.props.dream.sentiment}</h5>
			<p>{this.props.dream.content}</p>
			<p>
				<button type="button" id={this.props.dream._id} onClick={this.deleteDream}>Delete</button>
			</p>
		</div>
	)
	}
}

export default DreamEntry;
