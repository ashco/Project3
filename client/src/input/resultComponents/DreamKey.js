import React, { Component } from 'react';
// MATERIAL UI
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class DreamKey extends Component{
	state = {
		open: false,
		// disabled: false
  };

	// componentDidMount() {
	// 	if(this.props.keys.description == null){
	// 		this.setState({disabled: true});
	// 		console.log('#####################################', this.props.keys.name);
	// 		console.log('#####################################', this.state.disabled);
	// 	}
	// }

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
        primary={true}
        onClick={this.handleClose}
      />
		];
		
		return(
			<div>
				<FlatButton label={this.props.keys.name} onClick={this.handleOpen} />
				<Dialog
					title={this.props.keys.name}
					actions={actions}
					modal={false}
					open={this.state.open}
					// disabled={this.state.disabled}
					onRequestClose={this.handleClose}
				>
					{this.props.keys.description}
				</Dialog>
			</div>
		);
	}
}

export default DreamKey;