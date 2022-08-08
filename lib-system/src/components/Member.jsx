import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';
import { Spinner, Container, Button } from 'react-bootstrap';
import NavbarComponent from './user components/NavbarComponent';
import { v4 as uuidv4 } from 'uuid';

const Member = () => {
	const {
		requestBook,
		booksData,
		user,
		isLoading,
		pendingRequestData,
		userCollection,
	} = useContext(ContextVariable);

	const booksCollection =
		booksData?.filter && booksData.filter((item) => item.bookCopies > 0);

	console.log(userCollection);

	const [iSRenderCollection, setISRenderCollection] = useState(false);

	return (
		<div>
			{isLoading ? (
				<Spinner animation="border" variant="secondary" />
			) : (
				<>
					<NavbarComponent />

					<Container>
						<div className="d-flex">
							<p
								className={`btn me-3 text-white p-2 ${
									iSRenderCollection === false && 'btn-outline-light text-white'
								}`}
								onClick={() => setISRenderCollection(false)}
							>
								Books available
							</p>
							<p
								className={`btn p-2 text-white ${
									iSRenderCollection === true && 'btn-outline-light text-white'
								}`}
								onClick={() => setISRenderCollection(true)}
							>
								My collection
							</p>
						</div>
						<div className="d-flex flex-wrap">
							{iSRenderCollection === false ? (
								booksCollection.length === 0 ? (
									<h3 className="text-white">No books</h3>
								) : (
									booksCollection?.map &&
									booksCollection.map((item) => {
										return (
											<div
												key={item.bookID}
												style={{ width: '260px' }}
												className="m-2 bg-dark text-white p-3 rounded"
											>
												<div className="d-flex justify-content-between">
													<div>
														<b>{item.bookName.slice(0, 25)}</b>
														<br></br>
														<small className="lead text-secondary fw-bold">
															{item.bookAuthor}
														</small>
														<br></br>
														<small className="overflowWrap text-secondary w-100">
															{item.bookDescription.slice(0, 20)}
														</small>
													</div>
												</div>
												<hr></hr>
												<p>Book copies: {item.bookCopies}</p>

												{pendingRequestData?.find &&
												pendingRequestData.find(
													(data) => data.bookRequesting === item.bookID
												) ? (
													<Button
														variant="light"
														className="w-100"
														onClick={() => requestBook(user.uid, item.bookID)}
													>
														Requested
													</Button>
												) : (
													<Button
														variant="outline-light"
														className="w-100"
														onClick={() => requestBook(user.uid, item.bookID)}
													>
														Request
													</Button>
												)}
											</div>
										);
									})
								)
							) : (
								<div className="d-flex flex-wrap">
									{booksData?.map &&
										booksData.map((item) => {
											return (
												userCollection?.map &&
												userCollection.map((data) => {
													if (data.bookRequesting === item.bookID) {
														return (
															<div className="bg-dark text-white p-3 m-2 rounded">
																<div>
																	<b>{item.bookName.slice(0, 25)}</b>
																	<br></br>
																	<small className="lead text-secondary fw-bold">
																		{item.bookAuthor}
																	</small>
																	<br></br>
																	<small className="overflowWrap text-secondary w-100">
																		{item.bookDescription.slice(0, 20)}
																	</small>
																</div>
															</div>
														);
													}
												})
											);
										})}
								</div>
							)}
						</div>
					</Container>
				</>
			)}
		</div>
	);
};

export default Member;
