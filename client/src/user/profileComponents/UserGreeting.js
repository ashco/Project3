import React, { Component } from 'react';

class UserGreeting extends Component {
	render(){
		return(
			<div className="Profile__box">
				<h2>Hello, {this.props.name}</h2>
				<p>You've entered</p>
				<h1 className="dreamTotal">{this.props.totalDreams}</h1>
				<p>dreams</p>
			</div>
		);
	}
}

export default UserGreeting;