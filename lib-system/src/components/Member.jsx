import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextVariable } from '../context/context-config';
import { Spinner } from 'react-bootstrap';

const Member = () => {
	const { user, logOut, users, isLoading } = useContext(ContextVariable);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logOut();
			navigate('/');
		} catch (error) {
			console.log(error.message);
		}
	};

	const currentUser =
		users?.filter && users.filter((item) => item.userID === user.uid);

	return (
		<div>
			{isLoading ? (
				<Spinner animation="border" variant="secondary" />
			) : (
				<>
					{currentUser?.map &&
						currentUser.map((item) => {
							return <p key={item.userID}>Hi member! {item.username}</p>;
						})}

					<button onClick={handleLogout}>Log out </button>
				</>
			)}
		</div>
	);
};

export default Member;
