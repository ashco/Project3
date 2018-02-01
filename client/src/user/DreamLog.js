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
        this.handleDelete = this.handleDelete.bind(this);
	}

	fetchDreams = () => {
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

    componentDidMount() {
      this.fetchDreams();
	}

	handleDelete = (dream_id) => {
		console.log(dream_id,"is the info we got from the dreamentry component");
		let dreamUrl = '/dream/' + dream_id;
		let base = this;
		axios({
			method: 'delete',
			url: dreamUrl,
			data: {
				id: dream_id,
				user: base.props.user
			}
		}).then((result) => {
			console.log(result);
			base.fetchDreams();
		}).catch((error) => {
			console.log('error returned', error.response.data);
		})

	}

  render(){
  	const displayState = this.state.dreamState;
  	let display = null;

  	if(displayState === false ){
  		display = <WaitingState />
  	} else if (displayState === true ) {
  		display = this.state.dreams.map((dream, index) => {
  			if(dream._id) {
  				return <DreamEntry key={index} dream={dream} handleDelete={this.handleDelete} />
  			}
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
