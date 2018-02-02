import React, { Component } from 'react';
import { ResponsiveContainer, PieChart, Pie, Sector, Cell, Legend, Tooltip } from 'recharts';
import {doughnutChartData} from '../../scripts/dataCleansing.js'


class DreamScore extends Component {
	render (){ 

	const rawData = this.props.data;
	console.log('raw data', rawData);
	const data = doughnutChartData(rawData);
	console.log('final data for chart', data);
	    

	const COLORS = ['#A1D4E3', '#F98285', '#BD70B3', '#E9CC84'];

	const RADIAN = Math.PI / 180; 
  
  // function to add percent labels if wanted
  const renderTooltipContent = (props) => {
      const { active, payload } = props;

    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percent = Math.round(data.value*100)
      return (
        <div className="customizedToolTip">
          <p className="ToolTipTitle">{data.name}: {percent} %</p>
        </div>
      );
    }

    return null;
  }



  	return (
  		<div className="DreamScore__box box">
      <h1> Overall Sentiment: {rawData.sentiment} </h1>
      <ResponsiveContainer height={440}>
  		<PieChart onMouseEnter={this.onPieEnter}>
      <Tooltip content={renderTooltipContent}/>
        <Legend verticalAlign="top" height={36}/>
        <Pie
          data={data} 
          cx={200} 
          cy={200}
          innerRadius={100}
          outerRadius={180}
          labelLine={false}
          fill="#8884d8"
          paddingAngle={.5}
        >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
      </ResponsiveContainer>
  		</div>
    );
  }
}


export default DreamScore;

