import React, { Component } from 'react';
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, CartesianGrid, Tooltip, Legend} from 'recharts';


class KeywordTrends extends Component {
	render(){
		const data = this.props.data;
		console.log('barchart data', data);

		const CustomizedLabel = () => {
			    const {x, y, fill, value} = this.props;
			   	return <text 
			               x={x} 
			               y={y} 
			               dy={-4} 
			               fontSize='16' 
			               fontFamily='sans-serif'
			               fill={fill}
			               textAnchor="middle">{value}%</text>

		};

		return(
    	<BarChart 
    	width={900} height={260} 
            data={data}
            margin={{top: 5, right: 0, left: 0, bottom: 25}}>
       <XAxis 
           dataKey="Text"
           fontFamily="sans-serif"
           tickSize
           dy='25'/>
       <YAxis hide/>
       <CartesianGrid 
           vertical={false}
           stroke="#ebf3f0"
       />
       <Bar 
           dataKey="value" 
           barSize ={170}
           fontFamily="sans-serif"
           label={<CustomizedLabel />}
           fill="#8884d8" />
        
      </BarChart>
		)
	}
}

export default KeywordTrends;

