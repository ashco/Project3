import React, { Component } from 'react';
import Title from '../layout/Title.js';
import DreamScore from './resultComponents/DreamScore.js';
import DreamKey from './resultComponents/DreamKey.js';


class DreamResult extends Component {

  render(){
 
  	const sentiment = this.props.analysis.data[0]
  	const overallSentiment = this.props.analysis.data[1].sentiment
		
		
	const keywords = this.props.analysis.data[1].map(word => {
  		return(<DreamKey keys={word} className="DreamKey__box box" />)
  	})

    return(
			<div className="DreamResult">
				<h1>Your dream was <span className={overallSentiment}>{overallSentiment}</span>.</h1>
				<DreamScore data={sentiment}/>
				<div className="DreamResult__box box">
					{keywords}
				</div>
			</div>
		);
  }
}

export default DreamResult;
