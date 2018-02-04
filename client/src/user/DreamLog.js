import React, { Component } from 'react';
import Title from '../layout/Title.js';
// import DreamLogItem from '../components/DreamLogItem.js';
import axios from 'axios';
import DreamEntry from './DreamEntry.js'
import Loading from '../input/Loading.js'
import {sortbyDate} from '../scripts/profileDataCleansing.js'

class DreamLog extends Component {
	constructor(props){
		super(props);
		this.state = {
			dreams: [],
			dreamState: false
		}
		
		this.handleEdit = this.handleEdit.bind(this);
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
			let rawData = result.data.concat([result]);
			let foundDreams = sortbyDate(rawData);
			
			base.setState({
				dreams: foundDreams,
				dreamState: true
			});
			console.log("State: ",base.state.dreams);
		}).catch((error) => {
			console.log("An error occured",error.response.data);
		});
	}

	componentDidMount() {
		if(!this.props.user || !this.props.user.id){
			return;
		}
		this.fetchDreams();
	}

	handleEdit = (dream_id, date, content) => {
		//Add content, date in here
		let dreamUrl = '/dream/edit/' + dream_id;
		let base = this;

		axios({
			method: 'put',
			url: dreamUrl,
			data: {
				user: base.props.user,
				id: dream_id,
				date: date,
				content: content
			}
		}).then((result) => {
			console.log(result);
			base.fetchDreams();
		}).catch((error) => {
			console.log('error returned', error.response.data);
		})
	}
	
	handleDelete = (dream_id) => {
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
  		display = <Loading />
  	} 
    else if (displayState === true && this.state.dreams.length < 1) {
		  display = <p>No dreams to log.</p>
  	} 
    else if (displayState === true && this.state.dreams.length >= 1) {
  		display = this.state.dreams.map((dream, index) => {
  			if(dream._id) {
					return <DreamEntry 
						key={index} 
						dream={dream} 
						handleGet={this.props.handleGet}
						handleEdit={this.handleEdit} 
						handleDelete={this.handleDelete} 
					/>
  			}
    	});
		}
                                      
		// LOGGED IN PAGE
		if(this.props.user && this.props.user.name){
			return (
				<div className="Profile">
					<Title text="dream log" style="DreamLog__title" />
					<div className="DreamLog">
						{display}
					</div>
				</div>
			);
		}
		// NOT LOGGED IN PAGE
		else {
      return (
        <div className="Profile">
          <Title text="dream log" style="DreamLog__title" />
          <p>You need to be logged in to view this page.</p>
        </div>
      );
    }
  }
}

export default DreamLog;
