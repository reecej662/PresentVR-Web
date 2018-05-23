import { combineReducers } from 'redux';
import { roomCode } from './roomCode';
import { error } from './error';
import { session } from './session';
import { user } from './user';
import { presentations } from './presentations';

export const initialState = {
	user: null,
	roomCode: null,
	error: null,
	session: null,
	presentations: null
}

export default combineReducers({
	user,
	roomCode,
	error,
	session,
	presentations
})