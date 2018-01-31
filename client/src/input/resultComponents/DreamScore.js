import React, { Component } from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';
//import { LineChart, Line } from 'recharts';

import {RadialBarChart, RadialBar, Legend} from 'recharts';
import {doughnutChartData} from '../../scripts/dataCleansing.js'



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
  		<PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
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
  		
  		</div>
    );
  }
}


export default DreamScore;

