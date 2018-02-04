import React, { Component } from 'react';
import axios from 'axios';
import MaterialLoad from '../layout/MaterialLoad';

const Loading = () => {
	return(
		<div className="Loading__box">
			<MaterialLoad />
		</div>
	);
}

// class Loading extends Component {

//   render(){
//     return(
//     	<div className="Loading__box">
// 				<MaterialLoad />
// 			</div>
// 		);
//   }
// }

export default Loading;