import React, { Component } from 'react';
import DreamScore from './resultComponents/DreamScore.js';
import DreamKey from './resultComponents/DreamKey.js';


class DreamResult extends Component {
  render(){
		const sentiment = this.props.analysis.data[0]
		const keywords = this.props.analysis.data[1].map(word => {
				return(<DreamKey keys={word} className="DreamKey__box box" />)
			})
		let keywordsTitle = null;
		if(keywords.length >= 1) {
			keywordsTitle = <h3>Learn more about the key symbols in your dream:</h3>;
		} 

    return(
			<div className="DreamResult">
				<DreamScore data={sentiment} />
				<div className="DreamResult__box box">
					{keywordsTitle}
					{keywords}
				</div>
			</div>
		);
  }
}

export default DreamResult;
