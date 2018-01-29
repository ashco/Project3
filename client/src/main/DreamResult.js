import React, { Component } from 'react';

class DreamResult extends Component {
  render(){
    return(
			<div className="form">
				<h1>Your dreams are weird!</h1>
				<div className="sentiment">
					<h1>78</h1>
				</div>
				<div className="keys">
					<div className="key">Key 1</div>
					<div className="key">Key 2</div>
					<div className="key">Key 3</div>
					<div className="key">Key 4</div>
				</div>
			</div>
		);
  }
}

export default DreamResult;
