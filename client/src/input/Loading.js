import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import CircularProgress from 'material-ui/CircularProgress';

const Loading = () => {
	return(
		<div className="Loading__box">
			<CircularProgress size={80} thickness={10} />
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