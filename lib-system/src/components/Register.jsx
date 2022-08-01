import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';
import { InputGroup, Form } from 'react-bootstrap';

const Register = () => {
	const { name } = useContext(ContextVariable);

	return (
		<div
			className="d-flex justify-content-center align-items-center text-center"
			style={{ height: '100vh' }}
		>
			<div className="p-3  rounded" style={{ maxWidth: '360px' }}>
				<h3 className="fw-bold">Signup to create an account</h3>
				<small>
					Already have an account?{' '}
					<Link to="/" style={{ color: '#f72585' }}>
						Login
					</Link>
				</small>
				<input
					type="text"
					placeholder="Username"
					className="input-text w-100 rounded my-2 p-2"
				></input>
				<input
					type="email"
					placeholder="Email address"
					className="input-text w-100 rounded my-2 p-2"
				></input>

				<input
					type="text"
					placeholder="Password"
					className="input-text w-100 rounded my-2 p-2"
				></input>
				<input
					type="text"
					placeholder="Confirm Password"
					className="input-text w-100 rounded my-2 p-2"
				></input>

				<button className="login-button w-100 my-3 p-2 rounded">Signup</button>
			</div>
		</div>
	);
};

export default Register;
