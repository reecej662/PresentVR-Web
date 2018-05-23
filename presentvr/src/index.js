import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers/index';
import { getCurrentUser } from './actions/user';
import firebase, {auth, db} from './auth.js';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
var user = auth.currentUser;

auth.onAuthStateChanged(function (tempuser) {
  if (tempuser) {
    // User is signed in

    user = tempuser
    //store.dispatch(loginUser());

    console.log(tempuser);
    console.log("Doing something in index.js");
    store.dispatch(getCurrentUser(tempuser.email));

     ReactDOM.render((
            <Provider store={store}>
              <App/>
            </Provider>
          ), document.getElementById('root'));

  } else {
    // User is signed out

    ReactDOM.render((
      <Provider store={store}>
        <App/>
      </Provider>
    ), document.getElementById('root'));
  }
});

registerServiceWorker();
