import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextVariable } from '../../context/context-config';
import {
	Navbar,
	Nav,
	Container,
	DropdownButton,
	Dropdown,
} from 'react-bootstrap';
import { BsBoxArrowLeft } from 'react-icons/bs';

const NavbarComponent = () => {
	const { logOut } = useContext(ContextVariable);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logOut();
			navigate('/');
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<Navbar bg="dark" variant="dark" expand="md" className="mb-4">
			<Container>
				<Navbar.Brand href="/admin">Lib System</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Nav className="mx-auto">
						<Nav.Link href="/admin">Home</Nav.Link>
						<Nav.Link href="#features">Features</Nav.Link>
						<Nav.Link href="#pricing">Pricing</Nav.Link>
					</Nav>
					<Nav>
						<DropdownButton
							variant="outline-light"
							className="mx-auto my-2"
							title="Profile"
							size="sm"
						>
							<Dropdown.Item>Profile</Dropdown.Item>
							<Dropdown.Item onClick={handleLogout}>
								<BsBoxArrowLeft className="me-2" />
								Log out{' '}
							</Dropdown.Item>
						</DropdownButton>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarComponent;
