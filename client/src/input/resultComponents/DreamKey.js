import React, { Component } from 'react';

class DreamKey extends Component{
	render(){
	return(
		<div className="DreamKey__box box">
			<p className="DreamKey__text">Keyword: {this.props.keys.name}</p>	
			<p className="DreamKey__text">Description: {this.props.keys.description}</p>	
		</div>
	)
	}
}

export default DreamKey;
