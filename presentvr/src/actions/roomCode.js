import axios from 'axios';
import { setError } from './error';
import { setSession } from './session';

export const setRoomCode = (roomCode, sessionId) => {
	return {
		type: 'SET_ROOMCODE',
		roomCode: roomCode,
		sessionId: sessionId
	}
}

export const getRoomCode = roomCode => {
	console.log("Getting room code");

	return function (dispatch) {
		axios.get("http://104.131.9.190:3000/r/" + roomCode,
			{headers: {'Access-Control-Allow-Origin': '*'}}
		)
		.then(function (response) {
			if(response.data.error)
				dispatch(setError(response.data.error));
			else {
				dispatch(setRoomCode(roomCode));
				dispatch(setSession(response.data.sessionId));
			}
		})
		.catch(function (error) {
			console.log(error);
		})
	}
}