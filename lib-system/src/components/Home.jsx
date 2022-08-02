import React, { useContext } from 'react';
import { ContextVariable } from '../context/context-config';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
	const { user, users } = useContext(ContextVariable);
	let navigate = useNavigate();

	const currentUser =
		users?.filter && users.filter((item) => item.userID === user.uid);

	const redirectUser =
		currentUser?.map && currentUser.map((item) => item.setRadioValue)[0];

	useEffect(() => {
		redirectUser === '1' ? navigate('/member') : navigate('/admin');
	}, []);
};

export default Home;
