import React, { Component } from 'react';
import * as Colors from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {typography} from 'material-ui/styles';
import RoomForm from './components/RoomForm';
import RoomPage from './components/RoomPage/RoomPage';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Edit from './components/Edit';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import logo from './images/presentvr_topbar_logo.png';
import {logoutUser} from './actions/user';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route path="/new" component={Edit}/>
          <Route path="/dash" component={Dashboard}/>
          <Route path="/login" component={Login}/>
          <Route path="/edit/:presentationId" render={(props) => (<Edit presentationId={props.match.params.presentationId}/>)}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
