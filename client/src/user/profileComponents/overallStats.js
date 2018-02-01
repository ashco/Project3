import React, { Component } from 'react';
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


class OverallStats extends Component {
	render(){
		const data = this.props.data;
		const parseDomain = () => {
		  return [
		    0,
		    Math.max.apply(null, [
		      ...data.map(entry => entry.value)
		    ])
		  ];
		};

		const renderTooltip = (props) => {
			const { active, payload } = props;
		    if (active && payload && payload.length) {
		      const data = payload[0].payload;

		      return (
		        <div style={{ backgroundColor: '#fff', border: '1px solid #999', margin: 0, padding: 10 }}>
		          <p>{data.hour}</p>
		          <p><span>{data.sentiment}</span> dreams: {data.actualValue}</p>
		        </div>
		      );
		    }
		}

		const domain = parseDomain();
    	const range = [16, 225];


		return(
			<div>
			You have logged a total of {this.props.totalDreams} Dreams!
	        <ScatterChart width={800} height={200} margin={{top: 5, right: 0, bottom: 0, left: 0}}>
	          <XAxis type="category" dataKey="sentiment" name="hour" interval={0} tickLine={false} axisLine={false}/>
	          <YAxis type="number" dataKey="index" height={10} width={80} tick={false} tickLine={false} axisLine={false} />
	          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
	          <Tooltip cursor={{strokeDasharray: '3 3'}} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
	          <Scatter data={data} fill='#8884d8'/>
	        </ScatterChart>
			</div>

		)
	}
}

export default OverallStats;
