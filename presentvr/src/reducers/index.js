import { combineReducers } from 'redux';
import { roomCode } from './roomCode';
import { error } from './error';
import { session } from './session';

export const initialState = {
	roomCode: null,
	error: null,
	session: null
}

export default combineReducers({
	roomCode,
	error,
	session
})