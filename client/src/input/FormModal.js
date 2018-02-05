import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

const errorColor = '#F98285';
const warnColor = '#BD70B3';
const completeColor = '#A1D4E3';

class FormModal extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			open: true,
			date: '',
			content: '',
    	content_text: "What do you remember?",
			disabled: true,
			dateStyle: errorColor,
			contentStyle: errorColor
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
			content_text: "What do you remember?",
			contentStyle: errorColor
		});
	}

	handleDateChange = (event, date) => {
		this.setState({ date: date });
	}

	handleContentChange = (event, content) => {
		if(content.length < 10){
			this.setState({
				content_text: "What do you remember?",
				contentStyle: errorColor
			});
		}
		else if(content.length < 20){
			this.setState({
				content: '',
				content_text: "Try to remember a few more things!",
				contentStyle: warnColor,
			});
		} 
		else {
			this.setState({
				content: content,
				content_text: "What a dream!",
				contentStyle: completeColor
			});
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
    this.props.handleInput(this.state.date, this.state.content);
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
			dateStyle: {
				color: `${this.state.dateStyle}`
			},
			contentStyle: {
				color: `${this.state.contentStyle}`,
				borderColor: `${this.state.contentStyle}`,
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
				primary={false}
				backgroundColor={completeColor}
				disabled={this.state.disabled}
				onClick={this.handleSubmit}
			/>
		];

		return (
			<div>
				<br />
				<button className="primaryCTA" onClick={this.handleOpen}>Analyze Your Dream</button>
				{/* <RaisedButton 
					label="Analyze Your Dream" 
					style={styles.button}
					onClick={this.handleOpen} 
				/> */}
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
						hintStyle={styles.dateStyle}
						onChange={this.handleDateChange} 
					/>
					<TextField 
						name="content"
						floatingLabelText={this.state.content_text}
						multiLine={true}
						fullWidth={true}
						rows={10}
						underlineFocusStyle={styles.contentStyle}
						floatingLabelStyle={styles.contentStyle}
						floatingLabelFocusStyle={styles.contentStyle}
						onChange={this.handleContentChange} 
					/>
				</Dialog>
			</div>
		);
	}
}

export default FormModal;