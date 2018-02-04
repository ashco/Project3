import React, { Component } from 'react';
// MATERIAL UI
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class DreamKey extends Component{
	state = {
		open: false,
		disabled: false
  };

	componentDidMount() {
		if(this.props.keys.description == null){
			this.setState({disabled: true});
		}
	}

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
	

	render() {
    const actions = [
      <RaisedButton
        label="Close"
        primary={false}
        onClick={this.handleClose}
      />
		];
		
		return(
			<div>
				<FlatButton 
					label={this.props.keys.name} 
					onClick={this.handleOpen} 
					disabled={this.state.disabled} />
				<Dialog
					title={this.props.keys.name}
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					{this.props.keys.description}
				</Dialog>
			</div>
		);
	}
}

export default DreamKey;