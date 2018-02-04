import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CallToAction extends Component {
	render(){
		return(
			<div className="Profile__box">
				<Link to="/analyze"><button className="primaryCTA">Analyze a New Dream</button></Link>
				<br />
         		<Link to="/log"><button className="secondaryCTA">View All Dreams</button></Link>
			</div>

		)
	}
}

export default CallToAction;