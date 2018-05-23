import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getRoomCode} from '../actions/roomCode';
import '../App.css';
import { TranscriptForm } from './RoomPage/TranscriptForm';
import { PresentationForm } from './RoomPage/PresentationForm';
import TopBar from './TopBar';
import {getPresentations} from '../actions/presentations';

import FlatButton from 'material-ui/FlatButton';
import {styles, buttonStyle} from '../styles/styles.js';
import * as Colors from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const mapStateToProps = (state, props) => ({
	presentation: state.presentations == null ? null : state.presentations.filter(pres => pres.id == parseInt(props.presentationId))[0],
	user: state.user
});

const mapDispatchToProps = dispatch => ({
	loadPresentations: (userId) => {
		dispatch(getPresentations(userId));
	}
});

class Edit extends Component {

	render() {
		if(this.props.user && this.props.user.id && this.props.presentation == null) {
			console.log("Loading presentations");
			this.props.loadPresentations(this.props.user.id)
		}

		console.log(this.props);

		if(this.props.presentation) {
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
							    My Presentation
							</h1>
							<Paper style={styles.paperTablet}>
	    						<div style={{fontSize: "30px", display:"flex", marginTop:"-20px"}}> 
		    						<TextField
				                      	value={this.props.presentation.name}
				                      	floatingLabelText="Name"
				                      	style={{width: "75%"}}
				                    	inputStyle={{
				                    		fontSize:'30px',
				                    		paddingBottom:'20px',
				                    		paddingTop:'15px'
				                    	}}
				                      	onChange={(event, newValue) => console.log(newValue)}
				                      	onKeyPress={console.log("Key pressed")}/><br/>
	    		    				<FlatButton style={{marginTop:'25px', marginLeft:'20px'}} label="Edit" onClick={()=>{console.log("Editing tilte")}}/>
	    						</div>
	    						<br/>
								<div style={{display:'flex'}}>
									<TranscriptForm {...this.props}/>
									<PresentationForm {...this.props}/>
								</div>
								<br/><br/>
								<FlatButton style={buttonStyle.thinBlue} label="Save" onClick={()=>{console.log("Saving presentation."); window.location.href="/dash"}}/>
							</Paper>
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
							    My Presentation
							</h1>
							<Paper style={styles.paperTablet}>
	    						<div style={{fontSize: "30px", display:"flex"}}> 
									<TextField
				                      	hintText="My Amazing Presentation"
				                      	floatingLabelText="Name"
				                      	style={{width: "75%"}}
				                    	inputStyle={{
				                    		fontSize:'30px',
				                    		paddingBottom:'20px',
				                    		paddingTop:'15px'
				                    	}}
				                      	onChange={(event, newValue) => console.log(newValue)}
				                      	onKeyPress={console.log("Key pressed")}/><br/>
	    						</div>
	    						<br/>
								<div style={{display:'flex'}}>
									<TranscriptForm {...this.props}/>
									<PresentationForm {...this.props}/>
								</div>
								<br/><br/>
								<FlatButton style={buttonStyle.thinBlue} label="Save" onClick={()=>{console.log("Saving presentation."); window.location.href="/dash"}}/>
							</Paper>
						</div>
					</MuiThemeProvider>
				</div>
			);
		}
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

export default connect(mapStateToProps, mapDispatchToProps)(Edit);