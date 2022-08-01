import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';
import { InputGroup, Form } from 'react-bootstrap';

const Loginpage = () => {
	const { name } = useContext(ContextVariable);

	return (
		<div
			className="d-flex justify-content-center align-items-center text-center"
			style={{ height: '100vh' }}
		>
			<div className="p-3  rounded" style={{ maxWidth: '360px' }}>
				<h3 className="fw-bold">Login to your account</h3>
				<small>
					Do you have an account?{' '}
					<Link to="/register" style={{ color: '#f72585' }}>
						Sign up
					</Link>
				</small>
				<input
					type="email"
					placeholder="Email address"
					className="input-text w-100 rounded my-2 p-2"
				></input>

				<input
					type="password"
					placeholder="Password"
					className="input-text w-100 rounded my-2 p-2"
				></input>

				<div className="d-flex justify-content-between align-items-center">
					<div>
						<input
							type="checkbox"
							id="checkbox"
							className="me-1"
							style={{ color: '#f72585' }}
						/>
						<label for="checkbox">
							<small style={{ color: '#495057' }}>Remember me</small>
						</label>
					</div>
					<small>
						<Link to="/sample" style={{ color: '#f72585' }}>
							Forgot your password?
						</Link>
					</small>
				</div>

				<button className="login-button w-100 my-3 p-2 rounded">Login</button>
			</div>
		</div>
	);
};

export default Loginpage;
