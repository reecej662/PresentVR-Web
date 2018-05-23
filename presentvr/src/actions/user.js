import axios from 'axios';
import { setError } from './error';
import firebase from '../auth';
// import { setSession } from './session';

export const setUser = (user) => {
	console.log("Got user: ", user);

	return {
		type: 'SET_USER',
		user: user,
	}
}

export const logoutUser = () => {
	console.log("Logging out")

	return function (dispatch) {
		firebase.auth().signOut();
		dispatch(setUser(null));
	}
}

export const loginUser = (username, password) => {
	console.log("Logging in ", username);

	return function (dispatch) {
		axios.get("http://104.131.9.190:3000/login",
			{
				headers: {'Access-Control-Allow-Origin': '*'},
				params: {
					username: username,
					password: password,
				}
			}
		)
		.then(function (response) {
			if(!response.data.error) {
				firebase.auth().signInWithEmailAndPassword(username, password)
				.catch(function (error) {
					var errorCode = error.code;
					var errorMessage = error.message;
					if(errorCode == "auth/invalid-email") {
						alert("Couldn't find your email")
					}
				});

				console.log("Logging in user ", response.data);

				dispatch(setUser(response.data));
			} else {
				alert("Error: invalid password/username");
				dispatch(setError(response.data.error));
			}
		})
		.catch(function (error) {
			console.log(error);
		})
	}
}

export const getCurrentUser = (username) => {
	console.log("Getting current user ", username);

	return function (dispatch) {
		axios.get("http://104.131.9.190:3000/user",
			{
				headers: {'Access-Control-Allow-Origin': '*'},
				params: {
					username: username
				}
			}
		).then(function (response) {
			console.log(response);
			if(!response.data.error) {
				dispatch(setUser(response.data));
			} else {
				alert("Error: error getting current user");
				dispatch(setError(response.data.error));
			}
		})
	}
}