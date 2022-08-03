import React, { useContext, useState } from 'react';
import { Modal, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { ContextVariable } from '../../context/context-config';
import { genres } from '../../data/data';
import { v4 as uuidv4 } from 'uuid';

const UploadBookModal = () => {
	const { handleClose, changeGenre, show, uploadBook, bookGenre, user } =
		useContext(ContextVariable);

	let bookID = uuidv4();

	const [bookName, setBookName] = useState('');
	const [bookAuthor, setBookAuthor] = useState('');
	const [bookDescription, setBookDescription] = useState('');

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Upload book</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<input
					type="text"
					className="input-text p-2 rounded w-100"
					placeholder="Book Name"
					onChange={(e) => setBookName(e.target.value)}
				/>
				<input
					type="text"
					className="input-text p-2 rounded w-100 my-2"
					placeholder="Author"
					onChange={(e) => setBookAuthor(e.target.value)}
				/>
				<textarea
					rows="3"
					cols="50"
					className="input-text p-2 rounded w-100"
					placeholder="Book Description"
					style={{ resize: 'none' }}
					onChange={(e) => setBookDescription(e.target.value)}
				/>

				<div>
					<small>Check a genre:</small>
					<div className="d-flex flex-wrap">
						{genres?.map &&
							genres.map((item) => {
								return (
									<small
										key={item.id}
										className="pointer-hover bg-secondary m-1 px-2 rounded text-white"
										onClick={() => changeGenre(item.name)}
									>
										{item.name}
									</small>
								);
							})}
					</div>
					<div className="mt-2">
						{bookGenre && (
							<>
								Genre:{' '}
								<p className="pointer-hover bg-secondary px-2 rounded text-white mt-2">
									{bookGenre}
								</p>
							</>
						)}
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<button
					className="login-button"
					onClick={() =>
						uploadBook(
							bookID,
							bookName,
							bookAuthor,
							bookDescription,
							bookGenre,
							user.uid
						)
					}
				>
					Upload
				</button>
			</Modal.Footer>
		</Modal>
	);
};

export default UploadBookModal;
