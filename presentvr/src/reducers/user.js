export const user = (state = null, action) => {
	console.log("Setting user ", action.user);
	switch(action.type) {
		case "SET_USER":
			return action.user
		default:
			return state
	}
}