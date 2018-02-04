import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

import {orange500, blue500} from 'material-ui/styles/colors';




class FormModal extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			open: true,
			date: '',
			content: '',
        	content_text: "What do you remember?",
			disabled: true
		}

		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleContentChange = this.handleContentChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}



	handleOpen = () => {
		this.setState({ open: true });
	}

	handleClose = () => {
		this.setState({
			open: false,
			date: '',
			content: '',
			content_text: "What do you remember?"});
	}

	handleDateChange = (event, date) => {
		this.setState({ date: date });
	}

	handleContentChange = (event, content) => {
		if(content.length < 10){
			this.setState({
				content_text: "Try to remember a few more things!",
			})
		} else {
			this.setState({
			content: content,
			content_text: null
			})
		}
	}
	
	componentDidUpdate() {
		if(this.state.disabled === true && this.state.date && this.state.content){
			this.setState({ disabled: false });
		}
		else if(this.state.disabled === false && !this.state.content){
			this.setState({ disabled: true });
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();
        this.props.handleInput(this.state.date, this.state.content)
		this.setState({
                open: true,
				date: '',
				content: ''
        });
	}

	render() {
		const styles = {
			button: {
				width: 280,
				height: 60
			},
			// TEXTBOX COLORS
			errorStyle: {
				color: "#A1D4E3",
			},
			underlineStyle: {
				borderColor: "#BD70B3",
			},
			floatingLabelStyle: {
				color: "#F98285",
			},
			floatingLabelFocusStyle: {
				color: "#ffdabf",
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
				disabled={this.state.disabled}
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
						autoOk={true}
						hideCalendarDate={true}
						value={this.state.date}
						onChange={this.handleDateChange} 
					/>
					<TextField 
						name="content"
						floatingLabelText={this.state.content_text}
						multiLine={true}
						fullWidth={true}
						rows={10}
						//Line Color
						underlineFocusStyle={styles.underlineStyle}
						floatingLabelStyle={styles.floatingLabelStyle}
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
						onChange={this.handleContentChange} 
					/>
				</Dialog>
			</div>
		);
	}
}

export default FormModal;