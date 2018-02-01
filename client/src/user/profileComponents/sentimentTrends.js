import React, { Component } from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';


class SentimentTrends extends Component {
	render() {
		const data = this.props.data;

		const getPercent = (value, total) => {
			const ratio = total > 0 ? value / total : 0;  
		  	return toPercent(ratio, 2);
		};

		const toPercent = (decimal, fixed = 0) => {
			return `${(decimal * 100).toFixed(fixed)}%`;
		};

		// const renderTooltipContent = (o) => {
		// 	const { payload, label } = o;
		// 	const total = payload.reduce((result, entry) => (result + entry.value), 0);
		  
		//   	return (
		//   		<div className="customized-tooltip-content">
		//     		<p className="total">{`${label} (Total: ${total})`}</p>
		//       	<ul className="list">
		//       		{
		//         		payload.map((entry, index) => (
		//           		<li key={`item-${index}`} style={{color: entry.color}}>
		//             		{`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
		//             	</li>
		//           	))
		//         	}
		//       	</ul>
		//     	</div>
		//   	);
		// };

		return(
			<div className="AreaChart_box">
				<AreaChart width={600} height={400} data={data} stackOffset="expand"
		            margin={{top: 10, right: 30, left: 0, bottom: 0}} >
			        <XAxis dataKey="date"/>
			        <YAxis tickFormatter={toPercent}/>
			        <CartesianGrid strokeDasharray="3 3"/>

			        <Area type='monotone' dataKey='positive' stackId="1" stroke='#FFFFFF' fill='#A1D4E3' />
			        <Area type='monotone' dataKey='negative' stackId="1" stroke='#FFFFFF' fill='#F98285' />
			        <Area type='monotone' dataKey='neutral' stackId="1" stroke='#FFFFFF' fill='#BD70B3' />
			        <Area type='monotone' dataKey='mixed' stackId="1" stroke='#FFFFFF' fill='#E9CC84' />
			    </AreaChart>
			</div>
		)
	}
}


export default SentimentTrends;

