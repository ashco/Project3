import React from 'react';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
class FormModal extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			open: true,
			date: '',
			content: ''
		}

		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleContentChange = this.handleContentChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleOpen = () => {
		this.setState({open: true});
	}

	handleClose = () => {
		this.setState({open: false});
	}

	handleDateChange = (event, date) => {
		this.setState({date: date});
	}

	handleContentChange = (event, content) => {
		this.setState({content: content});
	}
	
	handleSubmit = (event) => {
		event.preventDefault();
		this.props.handleInput(this.state.date, this.state.content)
		//clear state of date and content
	}

	render() {
		const actions = [
			<FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
			<RaisedButton
				label="Submit"
				primary={true}
				// keyboardFocused={true}
				onClick={this.handleSubmit}
				// onClick={this.handleClose}
			/>,
		];

		return (
			<div>
				<RaisedButton label="Dream Log" onClick={this.handleOpen} />
				<Dialog
					title="Log your dreams"
					actions={actions}
					modal={true}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					<DatePicker hintText="Dream date"
											name="date"
											fullWidth={true}
											// mode="landscape"
											value={this.state.date}
											onChange={this.handleDateChange} />
					<TextField name="content"
										//  errorText="This field is required"

										//  floatingLabelText="Text"
										multiLine={true}
										fullWidth={true}
										rows={10}
										onChange={this.handleContentChange} />
				</Dialog>
			</div>
		);
	}
}

export default FormModal;