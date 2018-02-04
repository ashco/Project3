import React, { Component } from 'react';
import {totalValues} from '../../scripts/profileDataCleansing.js'
import '../../style/Charts.css';

class OverallStats extends Component {
	render(){
		const data = this.props.data;
		const total = totalValues(data);
		const neutral = String((data[0].value/total).toFixed(2)+"em");
		const positive = String((data[1].value/total).toFixed(2)+"em");
		const negative = String((data[2].value/total).toFixed(2)+"em");
		const mixed = String((data[3].value/total).toFixed(2)+"em");

		// Colors for: neutral, positive, negative, mixed
		const COLORS = ['#BD70B3', '#A1D4E3', '#F98285', '#ffdabf'];

		const neturalStyle = {
				backgroundColor: COLORS[0],
				width: neutral,
				height: neutral,
				borderRadius: "50%"
			}

		const positiveStyle = {
				backgroundColor: COLORS[1],
				width: positive,
				height: positive,
				borderRadius: "50%"
		}

		const negativeStyle = {
			backgroundColor: COLORS[2],
			width: negative,
			height: negative,
			borderRadius: "50%"
		}

		const mixedStyle = {
			backgroundColor: COLORS[3],
			width: mixed,
			height: mixed,
			borderRadius: "50%"
		}

		return(
			<div className="Profile__box">
				<div className="dataVisualBubbles">
					<div className="dataBubble positive" style={positiveStyle}>
					</div>
					<div className="dataBubble neutral" style={neturalStyle}>
					</div>
					<div className="dataBubble negative" style={negativeStyle}>
					</div>
					<div className="dataBubble mixed" style={mixedStyle}>
					</div>
				</div>
			</div>
		)
	}
}

export default OverallStats;
