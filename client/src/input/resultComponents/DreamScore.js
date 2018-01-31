import React, { Component } from 'react';


class DreamScore extends Component {
	render (){ 
		console.log(this.props);
	return (
		<div className="DreamScore__box box">
			<h1 className="DreamScore__text">This will be your score</h1>
		</div>
	);
}
}


export default DreamScore;
