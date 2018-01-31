import React, { Component } from 'react';
import Title from '../layout/Title.js';
import axios from 'axios';

class Form extends Component {


  render(){
    return(
			<div className="Form">
				<Title text="Have you been dreaming?"  style="Form__title"/>

				<form className="Form__box box" onSubmit={this.props.handleSubmit}>
					<input name="date" type="date" onChange={this.props.handleChange}/>
					<textarea name="content" cols="30" rows="10" onChange={this.props.handleChange}/>
					<input className="Form__btn" type="submit"/>
				</form>
			</div>
		);
  }
}

export default Form;
