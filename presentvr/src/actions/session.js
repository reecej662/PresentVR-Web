export const setSession = (sessionId) => {
	return {
		type: 'SET_SESSION',
		session: sessionId
	}
}