import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getRoomCode } from '../actions/roomCode';
import { clearError } from '../actions/error';
import '../App.css';

const mapStateToProps = state => ({
	user: state.user,
	roomCode: state.roomCode,
	error: state.error
});

const mapDispatchToProps = dispatch => ({
	setRoomCode: (code) => {
		dispatch(getRoomCode(code));
	},
	clearError: () => {
		dispatch(clearError());
	}
})

class RoomForm extends Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value.toUpperCase()});
	}

	handleSubmit(event) {
		this.props.setRoomCode(this.state.value);
		event.preventDefault();
	}

	render() {
		if(this.props.roomCode != null && this.props.roomCode !== "")
			window.location.href = "room/" + this.props.roomCode;
		else if(this.props.error != null) {
			this.props.clearError();
			alert("Error: room not found");
		}

		return (
			<div className="App">
				<header className="App-header" style={{height:'75px'}}>
					<h1 className="App-title">Welcome to PresentVR</h1>
				</header>
				<p className="App-intro">
					To get started, enter your room code
				</p>
				<form onSubmit={this.handleSubmit}>
					<label>
						Room Code:
						<input type="text" value={this.state.value} onChange={this.handleChange} style={{marginLeft: '15px'}}/>
					</label>
					<br/><br/>
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomForm);