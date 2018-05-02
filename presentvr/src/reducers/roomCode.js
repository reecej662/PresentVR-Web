export const roomCode = (state = null, action) => {
	switch(action.type) {
		case "SET_ROOMCODE":
			return action.roomCode
		default:
			return state
	}
}