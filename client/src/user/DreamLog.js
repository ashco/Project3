import React, { Component } from 'react';
import Title from '../layout/Title.js';
// import DreamLogItem from '../components/DreamLogItem.js';
import axios from 'axios';
import DreamEntry from './DreamEntry.js'
import WaitingState from './WaitingState.js'

class DreamLog extends Component {
	constructor(props){
		super(props);
        this.state = {
          dreams: [],
          dreamState: false
        }
	}

    componentDidMount() {
      let userId= this.props.user.id;
      let base = this;

		axios({
			method: 'get',
			url: '/user/log',
			params: {
				user: userId
			}
		}).then((result) => {
			console.log(result);
			let foundDreams = result.data.concat([result]);

			base.setState({
				dreams: foundDreams,
				dreamState: true
			})
			console.log("State",base.state.dreams);
		}).catch((error) => {
			console.log("An error occured",error.response.data);
		})
	}

  render(){
  	const displayState = this.state.dreamState;
  	let display = null;

  	if(displayState === false ){
  		display = <WaitingState />
  	} else if (displayState === true ) {
  		display = this.state.dreams.map(function (dream, index) {
			return <DreamEntry key={index} dream={dream} />
    	})
    }
    return (
    	<div>
    		{display}
    	</div>
    )
  }
}

export default DreamLog;
