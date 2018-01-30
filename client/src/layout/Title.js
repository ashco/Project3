import React, { Component } from 'react';

class Title extends Component {
  render(){
    return(
			<div className="Title__box">
				<h1 className={`${this.props.style}`}>{this.props.text}</h1>
			</div>
		);
  }
}

export default Title;
