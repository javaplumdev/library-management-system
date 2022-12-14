import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';
import { Spinner, Container, Button, Dropdown } from 'react-bootstrap';
import NavbarComponent from './admin components/Navbar';
import { ImBooks } from 'react-icons/im';
import { BiFilterAlt, BiUpload } from 'react-icons/bi';
import { BsFillBellFill } from 'react-icons/bs';
import { TbBook } from 'react-icons/tb';
import UploadBookModal from './admin components/UploadBookModal';
import { genres } from '../data/data';

const AdminPage = () => {
	const {
		user,
		users,
		isLoading,
		handleShow,
		booksData,
		filterCategory,
		setFilterCategory,
		getCategory,
	} = useContext(ContextVariable);

	const currentUserCollection =
		booksData?.filter && booksData.filter((item) => item.userID === user.uid);

	const CategoryRender = () => {
		if (filterCategory === 'All') {
			return (
				<>
					{currentUserCollection?.length === 0 ? (
						<p className="text-center">No results for </p>
					) : (
						currentUserCollection?.map &&
						currentUserCollection.map((item) => {
							return (
								<div
									key={item.bookID}
									style={{ width: '260px' }}
									className="m-1 bg-dark p-3 rounded"
								>
									<div className="d-flex justify-content-between">
										<TbBook size="40" />
										<BsFillBellFill size="20" />
									</div>
									<b>{item.bookName.slice(0, 25)}</b>
									<br></br>
									<small className="lead text-secondary fw-bold">
										{item.bookAuthor}
									</small>
									<br></br>
									<small className="text-secondary">
										{item.bookDescription.slice(0, 20)}
									</small>

									<div className="mt-2">
										<small className="bg-secondary p-1 rounded ">
											{item.bookGenre}
										</small>
									</div>
									<Link to={`/details/${item.bookID}`}>
										<Button
											className="w-100 mt-3"
											variant="outline-light"
											size="sm"
										>
											Details
										</Button>
									</Link>
								</div>
							);
						})
					)}
				</>
			);
		} else {
			return (
				<>
					{getCategory.length === 0 ? (
						<p className="text-center">No results for {filterCategory}</p>
					) : (
						<div>
							<p>
								{getCategory.length} results for {filterCategory}
							</p>
							<div className="d-flex flex-wrap">
								{getCategory?.map &&
									getCategory.map((item) => {
										return (
											<div
												key={item.bookID}
												style={{ width: '260px' }}
												className="m-1 bg-dark p-3 rounded h-100"
											>
												<div className="d-flex justify-content-between">
													<TbBook size="40" />
													<BsFillBellFill size="20" />
												</div>
												<b>{item.bookName.slice(0, 25)}</b>
												<br></br>
												<small className="lead text-secondary fw-bold">
													{item.bookAuthor}
												</small>

												<br></br>
												<small className="text-secondary">
													{item.bookDescription.slice(0, 20)}
												</small>

												<div className="mt-2">
													<small className="bg-secondary p-1 rounded ">
														{item.bookGenre}
													</small>
												</div>
												<Link to={`/details/${item.bookID}`}>
													<Button
														className="w-100 mt-3"
														variant="outline-light"
														size="sm"
													>
														Details
													</Button>
												</Link>
											</div>
										);
									})}
							</div>
						</div>
					)}
				</>
			);
		}
	};

	return (
		<div>
			{isLoading ? (
				<div
					className="d-flex justify-content-center align-items-center"
					style={{ height: '80vh' }}
				>
					<Spinner animation="border" variant="secondary" />
				</div>
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
									<small className="text-secondary">
										{currentUserCollection?.length === 0 ||
										currentUserCollection?.length === 1
											? `${currentUserCollection?.length} document`
											: `${currentUserCollection?.length} documents`}
									</small>
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
														<Dropdown.Item
															key={item.id}
															onClick={() => setFilterCategory(item.name)}
														>
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
										Upload book
									</small>
									<UploadBookModal />
								</div>
							</div>
							<div className="d-flex flex-wrap mt-3 ">
								<CategoryRender />
							</div>
						</Container>
					</div>
				</>
			)}
		</div>
	);
};

export default AdminPage;
