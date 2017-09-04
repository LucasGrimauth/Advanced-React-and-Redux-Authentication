import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
	componentWillMount() {
		this.props.fetchMessage();
	}
	render() {
		return (
			<div>
				This is something you should only be able to see if you are authenticated.
				If you are not, <strong>GET OUT OF HERE!!!</strong>
				<div>...</div>
				<div>{this.props.message}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { message: state.auth.message }
}

export default connect(mapStateToProps, actions)(Feature);