import React, { Component } from 'react';
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Tooltip,LabelList, Legend} from 'recharts';


class KeywordTrends extends Component {
	render(){
		const data = this.props.data;
		console.log('barchart data', data);

    const renderTooltip = (props) => {
          const { active, payload } = props;
            if (active && payload && payload.length) {
              const data = payload[0].payload;

              return (
                <div className="customizedToolTip">
                  <p className="ToolTipTitle">{data.keyword}: {data.value}</p>
                </div>
              );
            }
        }

		return(
    <ResponsiveContainer height={260}>
    	<BarChart 
            data={data}
            margin={{top: 5, right: 0, left: 0, bottom: 25}}>
       <XAxis 
           dataKey="Text"
           fontFamily="sans-serif"
           tickSize
           dy='25'/>
       <YAxis hide/>
       <Tooltip  content={renderTooltip}/>
       <Bar 
           dataKey="value" 
           barSize ={170}
           fontFamily="sans-serif"
           fill="#8884d8" >
           <LabelList dataKey="keyword" fill="#FFFFFF" position="insideBottom" />
        </Bar>
      </BarChart>
      </ResponsiveContainer>
		)
	}
}

export default KeywordTrends;

