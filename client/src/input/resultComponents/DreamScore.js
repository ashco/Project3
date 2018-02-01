import React, { Component } from 'react';
import { ResponsiveContainer, PieChart, Pie, Sector, Cell,  Tooltip } from 'recharts';
//import { LineChart, Line } from 'recharts';

//import {RadialBarChart, RadialBar, Tooltip, Legend} from 'recharts';
import {doughnutChartData} from '../../scripts/dataCleansing.js'
import './PieChart.css';


class DreamScore extends Component {
	render (){ 

	const rawData = this.props.data;
	console.log('raw data', rawData);
	const data = doughnutChartData(rawData);
	console.log('final data for chart', data);
	    

	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

	const RADIAN = Math.PI / 180; 

  	return (
  		<div className="DreamScore__box box">
      <ResponsiveContainer width={600} height="80%">
  		<PieChart width={600} height={600} onMouseEnter={this.onPieEnter}>
        
        <Pie
          data={data} 
          cx={120} 
          cy={200} 
          innerRadius={60}
          outerRadius={80} 
          fill="#8884d8"
          paddingAngle={5}
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

