import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class DreamEntry extends Component{
	constructor(props){
		super(props);
	}

	handleDelete = () => {
		console.log("got to delete handler");
	
		// axios({
		// 	method: 'delete',
		// 	url: '/dream/12345',
		// 	data: {
		// 		id: 12345
		// 	}
		// }).then((result) => {
		// 	console.log(result);

		// }).catch((error) => {
		// 	console.log('error returned', error.response.data);
		// })
	}

	render(){
	return(
		<div className="DreamKey__box box">
			<h3>{this.props.dream.date}</h3>
			<h5>{this.props.dream.sentiment}</h5>
			<p>{this.props.dream.content}</p>
			<p>
				<button type="button" id={this.props.dream._id} onClick={this.handleDelete}>Delete</button>
			</p>
		</div>
	)
	}
}

export default DreamEntry;
