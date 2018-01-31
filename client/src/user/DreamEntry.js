import React, { Component } from 'react';

class DreamEntry extends Component{
	render(){
	console.log("Got to dream entry",this.props.dreams);
	const dreams = this.props.dreams.map(dream => {
		return(<p className="DreamKey__text">{dream.content}</p>)
	})
	return(
		<div className="DreamKey__box box">
			{dreams}	
		</div>
		)
	}
}

export default DreamEntry;
