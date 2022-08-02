import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';
import { Spinner, Container, DropdownButton, Dropdown } from 'react-bootstrap';
import NavbarComponent from './admin components/Navbar';
import { ImBooks } from 'react-icons/im';
import { BiFilterAlt, BiUpload } from 'react-icons/bi';
import UploadBookModal from './admin components/UploadBookModal';
import { genres } from '../data/data';

const AdminPage = () => {
	const { user, users, isLoading, handleShow } = useContext(ContextVariable);

	const currentUser =
		users?.filter && users.filter((item) => item.userID === user.uid);

	return (
		<div>
			{isLoading ? (
				<Spinner animation="border" variant="secondary" />
			) : (
				<>
					<NavbarComponent />
					<div className="text-white mt-4">
						<Container>
							<h4 className="fw-bold">
								<ImBooks /> Collection
							</h4>
							<hr></hr>
							<div className="d-flex justify-content-between flex-wrap">
								<div className="my-2">
									<b>All books</b>{' '}
									<small className="text-secondary">Length documents</small>
								</div>
								<div className="d-flex align-items-center my-2">
									<Dropdown className="me-2">
										<Dropdown.Toggle
											variant="outline-light"
											className="w-100 me-2"
										>
											<BiFilterAlt size="20" className="me-2" />
											<small>Filter by</small>
										</Dropdown.Toggle>
										<Dropdown.Menu>
											{genres?.map &&
												genres.map((item) => {
													return (
														<Dropdown.Item key={item.id}>
															{item.name}
														</Dropdown.Item>
													);
												})}
										</Dropdown.Menu>
									</Dropdown>

									<small
										size="sm"
										className="login-button"
										onClick={handleShow}
									>
										<BiUpload size="20" className=" me-2" />
										Upload doc
									</small>
									<UploadBookModal />
								</div>
							</div>
						</Container>
					</div>
				</>
			)}
		</div>
	);
};

export default AdminPage;
