import React, { Component } from 'react';
import DreamScore from './resultComponents/DreamScore.js';
import DreamKey from './resultComponents/DreamKey.js';


class DreamResult extends Component {
  render(){
		const sentiment = this.props.analysis.data[0]
		const keywords = this.props.analysis.data[1].map(word => {
				return(<DreamKey keys={word} className="DreamKey__box box" />)
			})

    return(
			<div className="DreamResult">
				<DreamScore data={sentiment} />
				<div className="DreamResult__box box">
					{keywords}
				</div>
			</div>
		);
  }
}

export default DreamResult;
