import React, { Component } from 'react';
import Title from '../layout/Title.js';
import DreamScore from '../components/DreamScore.js';
import DreamKey from '../components/DreamKey.js';


class DreamResult extends Component {
  render(){
    return(
			<div className="DreamResult">

				<Title text="Here is your dream analysis" style="DreamResult__title" />
				
				<DreamScore score="87" />

				<div className="DreamResult__box">
					<DreamKey keys="Tiger" />
					<DreamKey keys="Jungle" />
					<DreamKey keys="Spooky" />
					<DreamKey keys="Pepe" />
				</div>
			</div>
		);
  }
}

export default DreamResult;
