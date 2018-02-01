import React, { Component } from 'react';

class DreamEntry extends Component{
	render(){
	console.log("Got to dream entry",this.props.dreams);
	console.log("Type of this.props.dreams in DreamEntry",typeof Array.isArray(this.props.dreams));

	const dreams = this.props.dreams.map(function (dream, index) {
		return(<p key={index} className="DreamKey__text">{dream.content}</p>)
	})
	return(
		<div className="DreamKey__box box">
			{dreams}
		</div>
		)
	}
}

export default DreamEntry;
