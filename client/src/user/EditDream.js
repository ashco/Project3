import React, { Component } from "react";
// MATERIAL UI
import DatePicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class EditDream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.dream.date,
      content: this.props.dream.content,
    };
    this.editDream = this.editDream.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleDateChange = (event, date) => {
    this.setState({ date: date });
  };

  handleContentChange = (event, content) => {
    this.setState({ content: content });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    // console.log(this.state);
  };

  editDream = (event) => {
    event.preventDefault();
    // console.log(this.state.date,this.state.content,"EditDream form component");
    this.props.editDream(this.state.date, this.state.content);
  };

  render() {
    const styles = {
      contentStyle: {
        color: "#F98285",
        borderColor: "#F98285",
      },
      dateStyle: {
        color: "#F98285",
      },
    };
    if (this.props.editing) {
      return (
        <div className="Form">
          <div className="Form__box box edit">
            {/* DATE */}
            <DatePicker
              hintText="Dream date"
              name="date"
              // mode="landscape"
              fullWidth={true}
              onChange={this.handleDateChange}
              autoOk={true}
              hintStyle={styles.dateStyle}
              hideCalendarDate={true}
              value={this.state.date}
            />
            {/* TEXT */}
            <TextField
              name="content"
              floatingLabelText="Edit your dream"
              multiLine={true}
              fullWidth={true}
              rows={5}
              underlineFocusStyle={styles.contentStyle}
              floatingLabelStyle={styles.contentStyle}
              floatingLabelFocusStyle={styles.contentStyle}
              onChange={this.handleContentChange}
              value={this.state.content}
            />
            <RaisedButton
              label="Edit"
              primary={false}
              backgroundColor="#A1D4E3"
              onClick={this.editDream}
            />
          </div>
        </div>
      );
    } else {
      return <span></span>;
    }
  }
}

export default EditDream;
