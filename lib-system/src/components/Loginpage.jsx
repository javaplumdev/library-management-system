import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';
import { Alert } from 'react-bootstrap';
import { TbBooks } from 'react-icons/tb';

const Loginpage = () => {
	const { login, user, users } = useContext(ContextVariable);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState();

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await login(email, password);
			navigate('/home');
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div
			className="text-white d-flex justify-content-center align-items-center text-center"
			style={{ height: '80vh' }}
		>
			<form onSubmit={handleSubmit}>
				<div className="p-3  rounded" style={{ maxWidth: '360px' }}>
					<TbBooks size="80" />
					<h3 className="fw-bold">Login to your account</h3>

					<small>
						Do you have an account?{' '}
						<Link to="/register" style={{ color: '#f72585' }}>
							Sign up
						</Link>
					</small>
					{error && (
						<Alert variant="danger" className="my-2">
							{error}
						</Alert>
					)}

					<input
						type="email"
						placeholder="Email address"
						className="input-text w-100 rounded my-2 p-2"
						onChange={(e) => setEmail(e.target.value)}
					></input>

					<input
						type="password"
						placeholder="Password"
						className="input-text w-100 rounded my-2 p-2"
						onChange={(e) => setPassword(e.target.value)}
					></input>

					<div className="d-flex justify-content-between align-items-center">
						<div>
							<input
								type="checkbox"
								id="checkbox"
								className="me-1"
								style={{ color: '#f72585' }}
							/>
							<label htmlFor="checkbox">
								<small>Remember me</small>
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
			</form>
		</div>
	);
};

export default Loginpage;
