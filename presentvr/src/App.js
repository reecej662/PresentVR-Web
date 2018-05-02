import React, { Component } from 'react';
import RoomForm from './components/RoomForm';
import RoomPage from './components/RoomPage/RoomPage';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={RoomForm}/>
          <Route path="/room/:roomCode" render={(props) => (<RoomPage roomCode={props.match.params.roomCode}/>)}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
