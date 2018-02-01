import React, { Component } from 'react';
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend} from 'recharts';



class OverallStats extends Component {
	render(){
		return(
			<div>
			You have logged a total of {this.props.totalDreams} Dreams!

			</div>

		)
	}
}

export default OverallStats;

const data01 = [ { sentiment: 'neutral', index: 1, actualValue: 3, value: 4 },
  { sentiment: 'positive', index: 1, actualValue: 0, value: 1 },
  { sentiment: 'negative', index: 1, actualValue: 0, value: 1 },
  { sentiment: 'mixed', index: 1, actualValue: 0, value: 1 } ]

const parseDomain = () => {
  return [
    0,
    Math.max.apply(null, [
      ...data01.map(entry => entry.value)
    ])
  ];
};

const ThreeDimScatterChart = React.createClass({
	renderTooltip(props) {
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

    return null;
  },
  
	render () {
  	const domain = parseDomain();
    const range = [16, 225];


    return (
      <div>
        <ScatterChart width={800} height={60} margin={{top: 10, right: 0, bottom: 0, left: 0}}>
          <XAxis type="category" dataKey="sentiment" name="hour" interval={0} tickLine={false} axisLine={false}/>
          <YAxis type="number" dataKey="index" height={10} width={80} tick={false} tickLine={false} axisLine={false} />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip cursor={{strokeDasharray: '3 3'}} wrapperStyle={{ zIndex: 100 }} content={this.renderTooltip} />
          <Scatter data={data01} fill='#8884d8'/>
        </ScatterChart>
      </div>
    );
  }
})

ReactDOM.render(
  <ThreeDimScatterChart />,
  document.getElementById('container')
);