import React, { Component } from 'react';
import axios from 'axios';
import MaterialLoad from '../layout/MaterialLoad';

class Loading extends Component {

  render(){
    return(
    	<div className="Loading__box">
				YO SHIT IS LOADING
				<MaterialLoad />
			</div>
		);
  }
}

export default Loading;