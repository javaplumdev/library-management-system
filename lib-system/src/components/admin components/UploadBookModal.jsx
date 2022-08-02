import React, { useContext } from 'react';
import { Modal, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { ContextVariable } from '../../context/context-config';
import { genres } from '../../data/data';

const UploadBookModal = () => {
	const { handleClose, handleShow, show } = useContext(ContextVariable);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Modal heading</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<input
					type="text"
					className="input-text p-2 rounded w-100"
					placeholder="Book Name"
				/>
				<input
					type="text"
					className="input-text p-2 rounded w-100 my-2"
					placeholder="Author"
				/>
				<textarea
					rows="3"
					cols="50"
					className="input-text p-2 rounded w-100"
					placeholder="Book Description"
					style={{ resize: 'none' }}
				/>

				<div>
					<small>Check a genre:</small>
					<div className="d-flex flex-wrap">
						{genres?.map &&
							genres.map((item) => {
								return (
									<small
										key={item.id}
										className="bg-secondary m-1 px-2 rounded text-white"
									>
										{item.name}
									</small>
								);
							})}
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<button className="login-button" onClick={handleClose}>
					Upload
				</button>
			</Modal.Footer>
		</Modal>
	);
};

export default UploadBookModal;
