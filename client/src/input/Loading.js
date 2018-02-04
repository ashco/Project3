import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';


const Loading = () => {
	return(
		<div className="Loading__box">
			<LinearProgress mode="indeterminate" />
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