export const presentations = (state = null, action) => {
	switch(action.type) {
		case "SET_PRESENTATIONS":
			return action.presentations
		default:
			return state
	}
}