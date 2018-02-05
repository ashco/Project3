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
    <ResponsiveContainer height={450}>
    	<BarChart 
            data={data}
            margin={{top: 0, right: 0, left: 0, bottom: 0}}>
       <XAxis 
           dataKey="Text"
           fontFamily="Roboto"
           fontWeight="900" 
           tickSize
           dy='25'/>
       <YAxis hide/>
       <Tooltip  content={renderTooltip}/>
       <Bar 
           dataKey="value" 
           barSize ={200}
           fontFamily="Roboto"
           fill="#A1D4E3" >
           <LabelList dataKey="keyword" fill="rgba(68, 73, 82, 1)" position="insideTop" />
        </Bar>
      </BarChart>
      </ResponsiveContainer>
		)
	}
}

export default KeywordTrends;

