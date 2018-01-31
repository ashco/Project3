import React, { Component } from 'react';
import Title from '../layout/Title.js';
import DreamScore from './resultComponents/DreamScore.js';
import DreamKey from './resultComponents/DreamKey.js';


class DreamResult extends Component {

  render(){
 
  	const sentiment = this.props.analysis.data[0]
  	const keywords = this.props.analysis.data[1].map(word => {
  		return(<DreamKey keys={word} />)
  	})

    return(
			<div className="DreamResult">

				<Title text="Here is your dream analysis" style="DreamResult__title" />
				
				<DreamScore score="87" />

				<div className="DreamResult__box">
					{keywords}
				</div>
			</div>
		);
  }
}

export default DreamResult;
