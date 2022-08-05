import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';
import { Spinner, Container, Button } from 'react-bootstrap';
import NavbarComponent from './user components/NavbarComponent';
import { v4 as uuidv4 } from 'uuid';

const Member = () => {
	const { requestBook, booksData, user, isLoading, pendingRequestData } =
		useContext(ContextVariable);

	return (
		<div>
			{isLoading ? (
				<Spinner animation="border" variant="secondary" />
			) : (
				<>
					<NavbarComponent />

					<Container>
						<p className="text-white">Books available</p>
						<p className="text-white">My collection</p>
						<div className="d-flex flex-wrap">
							{booksData?.map &&
								booksData.map((item) => {
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
								})}
						</div>
					</Container>
				</>
			)}
		</div>
	);
};

export default Member;
