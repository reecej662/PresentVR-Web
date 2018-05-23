import React, { Component } from 'react';
import {connect} from 'react-redux';
//import { getRoomCode } from '../actions/roomCode';
import TopBar from './TopBar';
import { loginUser } from '../actions/user';
import { getPresentations } from '../actions/presentations';
import { addPresentationToRoom } from '../actions/presentations';
import FlatButton from 'material-ui/FlatButton';
import {styles, buttonStyle} from '../styles/styles.js';
import * as Colors from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import {auth} from '../auth.js';
import '../App.css';

const mapStateToProps = state => ({
	user: state.user
});

const mapDispatchToProps = dispatch => ({
});

class Landing extends Component {
	constructor(props) {
		super(props);
		if(auth.currentUser) {
			window.location.href = "/dash";
		}
	}

	render() {
		return (
			<div>
				<TopBar/>
				<MuiThemeProvider muiTheme={muiTheme}>
					<div style={{textAlign:'center'}}>
						<h1 style={{
							marginTop: "0.5em",
						    marginLeft: "15%",
						    marginRight: "15%",
						    clear: 'both',
						    fontFamily: "Avenir Next",
						    overflow: "hidden",
						    borderRadius: "4px"}}>
						    Welcome to PresentVR
						</h1>
						<div style={{
							marginTop: "1.3em",
						    marginLeft: "15%",
						    marginRight: "15%",
						    clear: 'both',
						    fontFamily: "Avenir Next",
						    overflow: "hidden",
						    borderRadius: "4px"
						}}>
							<p className="App-intro">
								To get started, either <br/><a href="login">Signup / Login</a><br/> or <br/><a href="new">Create a New Presentation</a><br/>
							</p>
						</div>
					</div>
				</MuiThemeProvider>	
			</div>
		);
	}
}


const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: "#131d35",
    primary2Color: Colors.indigo700,
    accent1Color: Colors.redA200,
    pickerHeaderColor: Colors.white,
    alternateTextColor: "#ffffff"
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);