import React, { Component } from 'react';

class Form extends Component {
  render(){
    return(
			<div className="form">
				<h1>This is the Form!</h1>
				<form>
					<input type="date" />
					<textarea name="dream-text" cols="30" rows="10" />
					<input type="submit" />
				</form>
			</div>
		);
  }
}

export default Form;
