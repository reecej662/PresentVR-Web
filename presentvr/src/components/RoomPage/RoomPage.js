import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getRoomCode} from '../../actions/roomCode';
import '../../App.css';
import { TranscriptForm } from './TranscriptForm';
import { PresentationForm } from './PresentationForm';

const mapStateToProps = state => ({
	session: state.session
});

const mapDispatchToProps = dispatch => ({
	onLoad: (roomCode) => {
		dispatch(getRoomCode(roomCode));
	}
});

class RoomPage extends Component {
	render() {
		this.props.onLoad(this.props.roomCode);

		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Welcome to PresentVR</h1>
					<h2 className="App-title">Room Code: {this.props.roomCode}</h2>
					<a style={{textDecoration: 'none', color:'#ffffff'}}href="/">Home</a>
				</header>
				<div>
					<TranscriptForm {...this.props}/>
					<PresentationForm {...this.props}/>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);