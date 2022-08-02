import React, { useContext } from 'react';
import { ContextVariable } from '../context/context-config';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
	const { user } = useContext(ContextVariable);

	if (!user) {
		return <Navigate to="/" />;
	}

	return children;
};

export default ProtectedRoute;
