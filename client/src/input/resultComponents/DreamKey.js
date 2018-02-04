import React, { Component } from 'react';
// MATERIAL UI
import Dialog from 'material-ui/Dialog';
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

	var buttonClass;
	if(this.state.disabled === true) {
		buttonClass = "Keyword__disabled"
		return(
			<div>
				<button 
					type="button" 
					className={buttonClass}
					disabled>
					{this.props.keys.name} 
				</button>
			</div>
		);
	} else if (this.state.disabled === false) {
		buttonClass = "Keyword__enabled"
		return(
			<div>
				<button 
					type="button"
					onClick={this.handleOpen} 
					className={buttonClass}>
					{this.props.keys.name} 
				</button>
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
}

export default DreamKey;