import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as Colors from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {typography} from 'material-ui/styles';
import RoomForm from './RoomForm';
import RoomPage from './RoomPage/RoomPage';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Login from './Login';
import Edit from './Edit';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import logo from '../images/presentvr_topbar_logo.png';
import {logoutUser} from '../actions/user';
import '../App.css';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch(logoutUser());
  }
});

class TopBar extends Component {
  home() {
    window.location.href = "/dash";
  }

  createProject() {
    window.location.href = "/new";
  }

  signOut() {
    window.location.href = "/login";
    this.props.signOut();
  }

  render() {
    const leftElements = (
      <div>
        <a href="/"><img src={logo} alt="Logo" height="20" vspace="13" hspace="10"/></a>
      </div>
    )

    const rightElements = (
      <div style={{paddingTop:8}}>
        <FlatButton labelStyle={{color:"white"}} label="Home" onClick={this.home} />
        <FlatButton labelStyle={{color:"white"}} label="Create Presentation" onClick={this.createProject} />
        <FlatButton labelStyle={{color:"white"}} label="Sign Out" onClick={this.signOut}/>
      </div>
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <AppBar iconElementLeft={leftElements} iconElementRight={rightElements}></AppBar>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  navigation: {
    fontSize: 15,
    //fontWeight: typography.fontWeightLight,
    color: 'grey',
    paddingBottom: 15,
    display: 'block'
  }
};

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: "#131d35",
    primary2Color: Colors.indigo700,
    accent1Color: Colors.redA200,
    pickerHeaderColor: Colors.white,
    alternateTextColor: "#ffffff"
  },
  appBar: {
    height: 60
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);