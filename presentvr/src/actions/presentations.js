import axios from 'axios';
import { setError } from './error';
import { setSession } from './session';

export const setPresentations = (presentations) => {
	return {
		type: 'SET_PRESENTATIONS',
		presentations: presentations
	}
}

export const getPresentations = userId => {
	console.log("Getting presentations for user ", userId);

	return function (dispatch) {
		axios.get("http://104.131.9.190:3000/presentations/" + userId,
			{headers: {'Access-Control-Allow-Origin': '*'}}
		)
		.then(function (response) {
			if(response.data.error)
				dispatch(setError(response.data.error));
			else {
				console.log(response.data);
				dispatch(setPresentations(response.data));
			}
		})
		.catch(function (error) {
			console.log(error);
		})
	}
}

export const addPresentationToRoom = (presentation, room) => {
	return function (dispatch) {
		axios.post("http://104.131.9.190:3000/r/" + room + "/setPresentation",
			{
				headers: {'Access-Control-Allow-Origin': '*'},
				data: presentation
			}
		)
		.then(function (response) {
			if(response.data.error)
				dispatch(setError(response.data.error));
			else {
				console.log(response.data);
				//dispatch(setPresentations)
				alert("Playing presentation \"" + presentation.name + "\" in room " + room);
			}				
		})
		.catch(function (error) {
			console.log(error);
		})
	}
}