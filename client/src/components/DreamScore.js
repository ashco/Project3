import React from 'react';

const DreamScore = (props) => {
	return(
		<div className="DreamScore__box box">
			<h1 className="DreamScore__text">{props.score}</h1>
		</div>
	);
}

export default DreamScore;
