import React, { useContext, useState } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import NavbarComponent from './Navbar';
import { ContextVariable } from '../../context/context-config';
import { TbBook } from 'react-icons/tb';
import { IoMdTrash } from 'react-icons/io';

const BookDetails = () => {
	const { id } = useParams();
	const { booksData, deleteBook, pendingRequestData, users, confirmBorrow } =
		useContext(ContextVariable);
	const [smShow, setSmShow] = useState(false);

	const book =
		booksData?.filter && booksData.filter((item) => item.bookID === id);

	const bookRequests =
		pendingRequestData?.filter &&
		pendingRequestData.filter((item) => item.bookRequesting === id);

	console.log(bookRequests);

	return (
		<div>
			<NavbarComponent />
			<Container>
				<div>
					{book?.map &&
						book.map((item) => {
							return (
								<div
									key={item.bookID}
									className="bg-dark text-white p-3 rounded"
								>
									<TbBook size="50" />
									<div className=" d-flex justify-content-between">
										<div>
											<h3 className="fw-bold">{item.bookName}</h3>
											<small className="lead text-secondary fw-bold">
												{item.bookAuthor}
											</small>
											<br></br>
											<small className="overflowWrap text-secondary w-100">
												{item.bookDescription}
											</small>
										</div>
										<IoMdTrash
											size="30"
											className="button-class"
											onClick={() => setSmShow(true)}
										/>
										<Modal
											size="sm"
											show={smShow}
											onHide={() => setSmShow(false)}
										>
											<Modal.Body>
												<div className="text-center">
													<p>Are you sure?</p>
													<Button
														variant="danger"
														onClick={() => deleteBook(id)}
													>
														Delete
													</Button>
												</div>
											</Modal.Body>
										</Modal>
									</div>

									<small>Book copies: {item.bookCopies}</small>
								</div>
							);
						})}

					<div className="bg-dark text-white p-3 rounded my-3">
						<small>
							{bookRequests?.length === 0 || bookRequests?.length === 1
								? `Request: ${bookRequests?.length}`
								: `Requests: ${bookRequests?.length}`}
						</small>

						{bookRequests?.map &&
							bookRequests.map((item) => {
								return (
									users?.map &&
									users.map((data) => {
										if (data.userID === item.userID) {
											return (
												<div
													key={data.userID}
													className="d-flex justify-content-between align-items-center py-2"
													style={{ borderBottom: '1px solid #6c757d' }}
												>
													<small className="lead">{data.username}</small>
													<button
														className="login-button"
														onClick={() =>
															confirmBorrow(
																item.userID,
																item.bookRequesting,
																item.pendingRequestID
															)
														}
													>
														Confirm
													</button>
												</div>
											);
										}
									})
								);
							})}
					</div>
				</div>
			</Container>
		</div>
	);
};

export default BookDetails;
