import React from 'react';

const Title = (props) => {
	return(
		<div className="Title__box">
			<h1 className={`${props.style}`}>{props.text}</h1>
		</div>
	);
}

export default Title;
