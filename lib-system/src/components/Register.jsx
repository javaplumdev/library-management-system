import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';
import { ButtonGroup, ToggleButton, Alert } from 'react-bootstrap';

const Register = () => {
	const { name, register } = useContext(ContextVariable);

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [checked, setChecked] = useState(false);
	const [radioValue, setRadioValue] = useState('1');
	const [error, setError] = useState();

	let navigate = useNavigate();

	const radios = [
		{ name: 'User', value: '1' },
		{ name: 'Admin', value: '2' },
	];

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			console.log('Password are mismatched!');
		} else {
			try {
				await register(email, password, username, radioValue);
				navigate('/');
			} catch (error) {
				setError(error.message);
			}
		}
	};

	return (
		<div
			className="text-white d-flex justify-content-center align-items-center text-center"
			style={{ height: '100vh' }}
		>
			<form onSubmit={handleSubmit}>
				<div className="p-3  rounded" style={{ maxWidth: '360px' }}>
					<h3 className="fw-bold">Signup to create an account</h3>

					<small>
						Already have an account?{' '}
						<Link to="/" style={{ color: '#f72585' }}>
							Login
						</Link>
					</small>
					{error && (
						<Alert variant="danger" className="my-2">
							{error}
						</Alert>
					)}
					<input
						type="text"
						placeholder="Username"
						className="input-text w-100 rounded my-2 p-2"
						onChange={(e) => setUsername(e.target.value)}
					></input>
					<input
						type="email"
						placeholder="Email address"
						className="input-text w-100 rounded my-2 p-2"
						onChange={(e) => setEmail(e.target.value)}
					></input>

					<input
						type="text"
						placeholder="Password"
						className="input-text w-100 rounded my-2 p-2"
						onChange={(e) => setPassword(e.target.value)}
					></input>
					<input
						type="text"
						placeholder="Confirm Password"
						className="input-text w-100 rounded my-2 p-2"
						onChange={(e) => setConfirmPassword(e.target.value)}
					></input>
					<small className="my-3 ">What are you?</small>
					<ButtonGroup className="w-100">
						{radios.map((radio, idx) => (
							<ToggleButton
								key={idx}
								id={`radio-${idx}`}
								type="radio"
								variant={idx % 2 ? 'outline-primary' : 'outline-primary'}
								name="radio"
								value={radio.value}
								checked={radioValue === radio.value}
								onChange={(e) => setRadioValue(e.currentTarget.value)}
							>
								{radio.name}
							</ToggleButton>
						))}
					</ButtonGroup>

					<button type="submit" className="login-button w-100 my-3 p-2 rounded">
						Signup
					</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
