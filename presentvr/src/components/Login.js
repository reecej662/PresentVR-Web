/*import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import { getRoomCode } from '../actions/roomCode';
//import { clearError } from '../actions/error';
import { loginUser } from '../actions/user';
import '../App.css';

const mapStateToProps = state => ({
	user: state.user
});

const mapDispatchToProps = dispatch => ({
	loginUser: (username, password) => {
		dispatch(loginUser(username, password));
	}
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

	handleChange = event => {
	this.setState({
	  [event.target.id]: event.target.value
	});
  }

	handleSubmit = event => {
		event.preventDefault();
		this.props.loginUser(this.state.username, this.state.password);
	}  


	render() {
		console.log(this.props.user);
		if(this.props.user)
			window.location.href = "/";
    return (
    	<div className="App">
			<header className="App-header" style={{height:'75px'}}>
				<h1 className="App-title">Welcome to PresentVR</h1>
			</header>
			
			<div className="Login">
				<form onSubmit={this.handleSubmit}>
					<FormGroup controlId="username" bsSize="large">
						<ControlLabel>Username<br/></ControlLabel>
						<FormControl
						autoFocus
						type="username"
						value={this.state.username}
						onChange={this.handleChange}
						/>
					</FormGroup>
					<br/>
					<FormGroup controlId="password" bsSize="large">
						<ControlLabel>Password<br/></ControlLabel>
						<FormControl
						value={this.state.password}
						onChange={this.handleChange}
						type="password"
						/>
					</FormGroup>
					<br/>
					<Button
					block
					bsSize="large"
					disabled={!this.validateForm()}
					type="submit"
					>
						Login
					</Button>
				</form>
			</div>	

		</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);*/
import React, {Component} from 'react';
import * as Colors from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../Auth.css';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {typography} from 'material-ui/styles';
import {TopBar} from './TopBar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import logo from '../images/dev_index_dark.svg'
import {connect} from 'react-redux';
import firebase, {auth, db} from '../auth.js';
import {loginUser, logoutUser} from '../actions/user'
import MediaQuery from 'react-responsive';

const styles = {
  title: {
    height: 30,
    fontSize: '1.8em',
    fontWeight: typography.fontWeightMedium,
    paddingTop: ".70em",
    fontFamily: "Avenir Next",
    fontWeight: 500
  },
  smallTitle: {
    paddingTop: "0.4em",
    height: 30,
    fontSize: '1.0em',
    fontWeight: typography.fontWeightLight,
    color: '#666',
    fontFamily: "Avenir Next"
  },
  subTitle: {
    paddingTop: "0.2em",
    height: 30,
    fontSize: '1.1em',
    fontWeight: typography.fontWeightLight,
    color: '#666',
    fontFamily: "Avenir Next"
  },
  logo: {
    margin: 'auto',
    padding: '0em 0em 0.5em 0em',
    fontFamily: "Avenir Next"
  },
  paper: {
    width: '400px',
    padding: '2em 3em 3em 3em',
    fontFamily: "Avenir Next"
  },
  paperMobile: {
    marginLeft: "1%",
    marginRight: "1%",
    padding: '2em 3em 3em 3em',
    fontFamily: "Avenir Next"
  },
  paperTablet: {
    width: '400px',
    margin: "auto",
    padding: '2em 3em 3em 3em',
    fontFamily: "Avenir Next"
  },
  loginButton: {
    marginTop: '3em',
    width: '100%'
  }
};

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: "#03a2ad",
    primary2Color: Colors.indigo700,
    accent1Color: Colors.redA200,
    pickerHeaderColor: Colors.white,
    alternateTextColor: "#ffffff"
  },
  appBar: {
    height: 60
  }
});

const mapStateToProps = state => ({
	user: state.user
});

const mapDispatchToProps = dispatch => ({
	loginUser: (username, password) => {
		dispatch(loginUser(username, password));
	}
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempEmail: '',
      tempPassword: ''
    }; // <- set up react state
  }

	handleClick(event) {
		event.preventDefault();
		this.props.loginUser(this.state.tempEmail, this.state.tempPassword);
	}  

  enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      this.handleClick(event);
    }
  }

  render() {
    if(this.props.user) {
      window.location.href = "/dash";
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>

        <MediaQuery minWidth={992}>
          <div
            style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            resize: "vertical"
          }}>

            <div
              style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              overflow: "hidden",
              backgroundColor: "#FDFDFF"
            }}>

              <div
                style={{
                width: "75%",
                float: "right",
                position: "relative"
              }}>
                <img
                  src="https://images.unsplash.com/photo-1485939420171-378de92ecd4c?auto=format&fit=crop&w=1950&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
                  style={{
                  height: "100%"
                }}/>
                <div
                  style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  display: "block",
                  background: "#000000",
                  top: 0,
                  left: 0,
                  opacity: 0.3
                }}></div>

              </div>

            </div>

            <div
              style={{
              position: "relative",
              marginLeft: "12.5%",
              marginRight: "12.5%"
            }}>

              <div
                style={{
                display: "inline",
                float: "left",
                marginRight: "12.5%"
              }}>
                <Paper style={styles.paper}>

                  <div style={styles.logo}>
                    <img
                      src={require('../images/login_lower.png')}
                      style={{
                      height: "3.2em",
                      paddingTop: 10,
                      display: "block",
                      margin: "auto"
                    }}/>
                  </div>

                  <div>
                    <TextField
                      hintText="example@gmail.com"
                      floatingLabelText="Email"
                      style={{
                      width: "100%"
                    }}
                      onChange={(event, newValue) => this.setState({tempEmail: newValue})}
                      onKeyPress={this
                      .enterPressed
                      .bind(this)}/><br/>
                    <TextField
                      hintText="Not password123"
                      style={{
                      width: "100%"
                    }}
                      floatingLabelText="Password"
                      type="password"
                      onChange={(event, newValue) => this.setState({tempPassword: newValue})}
                      onKeyPress={this
                      .enterPressed
                      .bind(this)}/><br/>

                    <RaisedButton
                      type="submit"
                      label="Login"
                      primary={true}
                      style={styles.loginButton}
                      onClick={(event) => this.handleClick(event)}/>

                    <div
                      style={{
                      paddingTop: "1.5em",
                      textAlign: "center"
                    }}>
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSe5q_fPeLmZ-l_isOaKrskdCqB602bQVd2CPF-EcYQ9guwMPQ/viewform?usp=sf_link"
                        style={{
                        color: "#000000"
                      }}>Join Beta</a>
                    </div>
                  </div>
                </Paper>

              </div>

              <div
                style={{
                display: "inline",
                color: "#ffffff",
                fontFamily: "Avenir Next"
              }}>
                <div
                  style={{
                  fontSize: "2.5em",
                  fontWeight: 600,
                  marginTop: "2.5em"
                }}>
                  Pay with Confidence
                </div>
                <div
                  style={{
                  fontSize: "1.7em",
                  paddingTop: "0.5em"
                }}>
                  Pay a curated index of <u>Non-US based</u> software agencies and dev firms with vetted and trustworthy data</div>
              </div>

            </div>
          </div>
        </ MediaQuery>

        <MediaQuery minWidth={701} maxWidth={991}>

          <div
            style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            resize: "vertical"
          }}>

            <div
              style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              overflow: "hidden",
              backgroundColor: "#FDFDFF"
            }}>

              <div
                style={{
                width: "100%",
                float: "right",
                position: "relative"
              }}>
                <img
                  src="https://images.unsplash.com/photo-1485939420171-378de92ecd4c?auto=format&fit=crop&w=1950&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
                  style={{
                  height: "100%"
                }}/>
                <div
                  style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  display: "block",
                  background: "#000000",
                  top: 0,
                  left: 0,
                  opacity: 0.3
                }}></div>

                <div
                  style={{
                  position: "absolute",
                  color: "#ffffff",
                  fontFamily: "Avenir Next",
                  left: "25%",
                  top: "30%",
                  marginRight: "15%"
                }}/>

              </div>

            </div>

            <div style={{
              position: "relative"
            }}>

              <div>
                <Paper style={styles.paperTablet}>

                  <div style={styles.logo}>
                    <img
                      src={require('../images/login_lower.png')}
                      style={{
                      height: "3.2em",
                      paddingTop: 10,
                      display: "block",
                      margin: "auto"
                    }}/>
                  </div>

                  <div>
                    <TextField
                      hintText="example@gmail.com"
                      floatingLabelText="Email"
                      style={{
                      width: "100%"
                    }}
                      onChange={(event, newValue) => this.setState({tempEmail: newValue})}
                      onKeyPress={this
                      .enterPressed
                      .bind(this)}/><br/>
                    <TextField
                      hintText="Not password123"
                      floatingLabelText="Password"
                      style={{
                      width: "100%"
                    }}
                      type="password"
                      onChange={(event, newValue) => this.setState({tempPassword: newValue})}
                      onKeyPress={this
                      .enterPressed
                      .bind(this)}/><br/>

                    <RaisedButton
                      type="submit"
                      label="Login"
                      primary={true}
                      style={styles.loginButton}
                      onClick={(event) => this.handleClick(event)}/>
                  </div>
                </Paper>
              </div>

            </div>
          </div>

        </ MediaQuery>

        <MediaQuery maxWidth={700}>

          <div
            style={{
            display: "block",
            margin: "auto",
            marginTop: "5em"
          }}>

            <Paper style={styles.paperMobile}>

              <div style={styles.logo}>
                <img
                  src={require('../images/login_lower.png')}
                  style={{
                  height: "2.3em",
                  paddingTop: 10,
                  display: "block",
                  margin: "auto"
                }}/>
              </div>

              <div>
                <TextField
                  style={{
                  width: "100%"
                }}
                  hintText="example@gmail.com"
                  floatingLabelText="Email"
                  onChange={(event, newValue) => this.setState({tempEmail: newValue})}
                  onKeyPress={this
                  .enterPressed
                  .bind(this)}/><br/>
                <TextField
                  style={{
                  width: "100%"
                }}
                  hintText="Not password123"
                  floatingLabelText="Password"
                  type="password"
                  onChange={(event, newValue) => this.setState({tempPassword: newValue})}
                  onKeyPress={this
                  .enterPressed
                  .bind(this)}/><br/>

                <RaisedButton
                  type="submit"
                  label="Login"
                  primary={true}
                  style={styles.loginButton}
                  onClick={(event) => this.handleClick(event)}/>

                <div
                  style={{
                  paddingTop: "1.5em",
                  textAlign: "center"
                }}>
                  <a
                    href="/request"
                    style={{
                    color: "#000000"
                  }}>Request Access</a>
                </div>
              </div>
            </Paper>

          </div>

        </ MediaQuery>

      </MuiThemeProvider>
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);