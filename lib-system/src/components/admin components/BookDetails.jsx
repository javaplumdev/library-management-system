import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import NavbarComponent from './Navbar';
import { ContextVariable } from '../../context/context-config';
import { TbBook } from 'react-icons/tb';

const BookDetails = () => {
	const { id } = useParams();
	const { booksData } = useContext(ContextVariable);

	const book =
		booksData?.filter && booksData.filter((item) => item.bookID === id);

	console.log(book);

	return (
		<div>
			<NavbarComponent />
			<Container>
				<div className="bg-dark text-white p-3 rounded">
					<TbBook size="50" />

					{book?.map &&
						book.map((item) => {
							return (
								<div key={item.bookID}>
									<h3>{item.bookName}</h3>
									<small className="lead text-secondary fw-bold">
										{item.bookAuthor}
									</small>
									<br></br>
									<small className="overflowWrap text-secondary w-100">
										{item.bookDescription}
									</small>
									<hr></hr>
								</div>
							);
						})}

					<p>Requests</p>
				</div>
			</Container>
		</div>
	);
};

export default BookDetails;
