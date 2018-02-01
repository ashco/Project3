import React, { Component } from 'react';
import { ResponsiveContainer, PieChart, Pie, Sector, Cell,  Tooltip } from 'recharts';
import {doughnutChartData} from '../../scripts/dataCleansing.js'
import './PieChart.css';


class DreamScore extends Component {
	render (){ 

	const rawData = this.props.data;
	console.log('raw data', rawData);
	const data = doughnutChartData(rawData);
	console.log('final data for chart', data);
	    

	const COLORS = ['#A1D4E3', '#F98285', '#BD70B3', '#E9CC84'];

	const RADIAN = Math.PI / 180; 
// function to add percent labels if wanted
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'}  dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

  	return (
  		<div className="DreamScore__box box">
      <h1> Overall Sentiment: {rawData.sentiment} </h1>
  		<PieChart width={400} height={400} onMouseEnter={this.onPieEnter}>
        
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
  		</div>
    );
  }
}


export default DreamScore;

