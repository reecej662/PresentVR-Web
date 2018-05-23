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
import '../App.css';

const mapStateToProps = state => ({
	user: state.user,
	presentations: state.presentations
});

const mapDispatchToProps = dispatch => ({
	getPresentations: (user) => {

	},
	addPresentationToRoom: (presentation, room) => {
		console.log("Adding ", presentation, " to room ", room);
		dispatch(addPresentationToRoom(presentation, room));
	},
	load: userId => {
		//dispatch(loginUser("reece", "test1234"));
		console.log("UserId: " + userId);
		dispatch(getPresentations(userId));
	},
	loginUser: () => {
		dispatch(loginUser("reece@aloalabs.com", "test1234"));
	}
});

class Dashboard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props.presentations);
		if(this.props.user == null) {
			console.log("Logging in user");
			//this.props.loginUser()
		}

		console.log("Props:");
		console.log(this.props);

		/*if(this.props.presentations == null && this.props.user && this.props.user.id) {	
			this.props.load(this.props.user.id);
		}*/
		this.props.load(1);
		/*if(!this.props.user)
			window.location.href = "/login";*/

		if(!this.props.user)
			this.props

		if(this.props.presentations) {
			return (
				<div>
					<TopBar/>
					<MuiThemeProvider muiTheme={muiTheme}>
						<div className="App">
							<h1 style={{
								marginTop: "0.5em",
							    marginLeft: "15%",
							    marginRight: "15%",
							    clear: 'both',
							    fontFamily: "Avenir Next",
							    overflow: "hidden",
							    borderRadius: "4px"}}>
							    My Presentations
							</h1>
							{this.props.presentations.map(presentation => {
								console.log("My presentation ", presentation)

								return (
									<Paper style={styles.paperTablet}>
										<ProjectCard addPresToRoom={this.props.addPresentationToRoom} presentation={presentation} key={presentation.id}/>
									</Paper>
								);
							})}
							<div style={{
								marginTop: "1.3em",
							    marginLeft: "15%",
							    marginRight: "15%",
							    clear: 'both',
							    fontFamily: "Avenir Next",
							    overflow: "hidden",
							    borderRadius: "4px"
							}}>
								<p style={{textAlign:"center"}}>Or</p>
								<FlatButton style={buttonStyle.thickBlue} label="Create a New Presentation" onClick={() => {window.location.href="/edit/new"}}/>
							</div>
						</div>
					</MuiThemeProvider>	
				</div>
			);
		} else {
			return (
				<div>
					<TopBar/>
					<MuiThemeProvider muiTheme={muiTheme}>
						<div className="App">
							<h1 style={{
								marginTop: "0.5em",
							    marginLeft: "15%",
							    marginRight: "15%",
							    clear: 'both',
							    fontFamily: "Avenir Next",
							    overflow: "hidden",
							    borderRadius: "4px"}}>
							    My Presentations
							</h1>
							<p style={{textAlign:'center'}}>Loading....</p>
						</div>
					</MuiThemeProvider>
				</div>
			);
		}
	}
}


class ProjectCard extends Component {
	render() {
		return (
			<div>		
				<div>
					<div style={{display: "flex"}}>
    					<div style={{display: "inline-block", verticalAlign: "middle", maxWidth: '100%', flex: 1}}>
    						<div style={{fontSize: "30px"}}> 
    							{this.props.presentation.name}
    						</div>
    					</div>
					</div>

				</div>
                <div style={{float: "right", paddingBottom: "10px", marginRight: "10px"}} >
                	<FlatButton style={buttonStyle.thinBlue} label="Edit" onClick={() => {window.location.href = ("/edit/" + this.props.presentation.id)}}/>
                </div>


				<div style={{paddingTop: 20, paddingLeft: 30}}>

    				<div style={{color: "#525252"}}>
    					<div style={{paddingBottom:5}}>Slides: {this.props.presentation.slides.length}</div>
    					<div style={{paddingBottom:5}}>Transcript: {this.props.presentation.transcript.slice(0, 50) + "..."} </div> 
    				</div>

				</div>

                <br/><br/>
                <PlayInRoomForm {...this.props}/>
			</div>
		)
	}
}

class PlayInRoomForm extends Component {
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
		event.nativeEvent.stopImmediatePropagation();
		event.preventDefault();

		this.props.addPresToRoom(this.props.presentation, this.state.value);
		this.setState({value: ''});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>	
				<label>
					Room Code:
					<input type="text" value={this.state.value} onChange={this.handleChange} style={{marginLeft: '15px'}}/>
				</label>
				<br/><br/>
				<FlatButton style={buttonStyle.thinBlue} label="Play in Room" type="submit" value="Play in Room"/>
			</form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);