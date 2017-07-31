import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR } from './types';

const ROOT_URL = 'http://localhost:8080';

export function signinUser({ email, password }) {
	return function(dispatch) {
		// Submit email/password to the server
		axios.post(`${ROOT_URL}/signin`, { email, password })
			.then(response => {
				// If request is good...
				// - Update state to indicate user is auth'd
				dispatch({ type: AUTH_USER });
				// - Save JWT token
				localStorage.setItem('token', response.data.token);
				// - redirect to /feature
				browserHistory.push('/feature');
			})
				.catch(() => {
				// If request is bad...
				// - Show an error to user
				dispatch(authError('Email or Password is incorrect  :('));
			});
	}
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	}
}