import React, { Component } from 'react';
import Title from '../layout/Title.js';
// import DreamLogItem from '../components/DreamLogItem.js';
import axios from 'axios';



class DreamLog extends Component {
	constructor(props){
		super(props);
        this.state = {
          dreams: ''
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
			let foundDreams = result;
			base.setState({
				dreams: foundDreams
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
		const DreamLogItem = () => {
			return <p>Test</p>
		}


  		return (
			<div>
				<Title text="Dream Log Entries" style="DreamLog__title" />
				<div className="DreamLog__listbox">
					{DreamLogItem}
				</div>
        	</div>
        );
  }
}




export default DreamLog;
