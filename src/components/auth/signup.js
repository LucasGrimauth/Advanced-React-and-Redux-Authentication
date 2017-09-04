import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
	handleFormSubmit(formProps) {
		const email = formProps.email;
		const password = formProps.password;
		this.props.signupUser({ email, password });
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
			);
		}
	}

	render() {
		const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

		return (
			<form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
				<fieldset className="form-group">
					<label>Email:</label>
					<input {...email} className="form-control" />
					{email.touched && email.error && <div className="error">{email.error}</div>}
				</fieldset>
				<fieldset className="form-group">
					<label>Password:</label>
					<input {...password} type="password" className="form-control" />
					{password.touched && password.error && <div className="error">{password.error}</div>}
				</fieldset>
				<fieldset className="form-group">
					<label>Confirm Password:</label>
					<input {...passwordConfirm} type="password" className="form-control" />
					{passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
				</fieldset>
				{this.renderAlert()}
				<button action="submit" className="btn btn-primary">Sign up!</button>
			</form>
		);
	}
}

// Get fields of reduxForm --- formProps
function validate(formProps) {
	const errors = {};

	if (!formProps.email) {
		errors.email = "Please, enter an email ( ಠ ʖ̯ ಠ)";
	}

	if (!formProps.password) {
		errors.password = "Please, enter an password ( ಠ ʖ̯ ಠ)";
	}

	if (!formProps.passwordConfirm) {
		errors.passwordConfirm = "Please, confirm your password ( ఠ ͟ʖ ఠ)!";
	}

	if(formProps.password !== formProps.passwordConfirm) {
		errors.password = 'Passwords must match ( ͡° ʖ̯ ͡°)';
	}

	return errors;
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.error }
}

export default reduxForm({
	form: 'signup',
	fields: ['email', 'password', 'passwordConfirm'],
	validate
}, mapStateToProps, actions)(Signup);