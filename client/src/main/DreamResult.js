import React, { Component } from 'react';
import Title from '../layout/Title.js';
import DreamScore from '../components/DreamScore.js';
import DreamKey from '../components/DreamKey.js';


class DreamResult extends Component {
  render(){
    return(
			<div className="DreamResult">

				<Title text="Here is your dream analysis" style="DreamResult__title" />
		
				<DreamScore />
				
				<div className="DreamResult__box">
					<DreamKey />
					<DreamKey />
					<DreamKey />
					<DreamKey />
				</div>
			</div>
		);
  }
}

export default DreamResult;
