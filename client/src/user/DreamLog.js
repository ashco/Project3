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

	handleDelete = (event) => {
		event.preventDefault();
		let base = this;

		axios({
			method: 'delete',
			url: '/dream/12345',
			data: {
				id: 12345
			}
		}).then((result) => {
			console.log(result);

		}).catch((error) => {
			console.log('error returned', error.response.data);
		})
	}

  render(){
  	const displayState = this.state.dreamState;
  	const dreamsData = this.state.dreams.data;

  	const arrayofDreams = [];
  	arrayofDreams.push(dreamsData);

  	console.log('typeof arrayofDreams', Array.isArray(arrayofDreams));
  	console.log('here is some array of arrayofDreams', arrayofDreams);


  	const dreams = this.state.dreams;
  	let display = null;


  	if(displayState === false ){
  		display = <WaitingState />
  	} else if (displayState === true ) {
  		display = <DreamEntry dreams={this.state.dreams}/>
    }
   // console.log('state inside render', this.state.dreams)
    return (
    	<div>
    		{display}
    	</div>
    )
  }
}

export default DreamLog;
