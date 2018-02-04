import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';


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
		this.setState({ open: true });
	}

	handleClose = () => {
		this.setState({ open: false });
	}

	handleDateChange = (event, date) => {
		this.setState({ date: date });
	}

	handleContentChange = (event, content) => {
		this.setState({ content: content });
	}
	
	handleSubmit = (event) => {
		event.preventDefault();
		this.props.handleInput(this.state.date, this.state.content);
	}

	render() {
		const styles = {
			button: {
				width: 280,
				height: 60
			}
		}

		const actions = [
			<FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
			<RaisedButton
				label="Submit"
				primary={true}
				onClick={this.handleSubmit}
			/>
		];

		return (
			<div>
				<br />
				<RaisedButton 
					label="Analyze Your Dream" 
					style={styles.button}
					onClick={this.handleOpen} 
				/>
				<Dialog
					title="Log your dreams"
					actions={actions}
					modal={true}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					<DatePicker 
						hintText="Dream date"
						name="date"
						fullWidth={true}
						value={this.state.date}
						onChange={this.handleDateChange} 
					/>
					<TextField 
						name="content"
						floatingLabelText="What do you remember?"
						multiLine={true}
						fullWidth={true}
						rows={10}
						onChange={this.handleContentChange} 
					/>
				</Dialog>
			</div>
		);
	}
}

export default FormModal;