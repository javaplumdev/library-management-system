import { createContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase-config';
import { collection, onSnapshot, setDoc, doc } from '@firebase/firestore';
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';

export const ContextVariable = createContext();

export const ContextFunction = ({ children }) => {
	const [name, setName] = useState('Charlito');
	const [users, setUsers] = useState({});
	const [booksData, setBookData] = useState({});
	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [show, setShow] = useState(false);

	useEffect(() => {
		onSnapshot(collection(db, 'users'), (snapshot) => {
			setUsers(snapshot.docs.map((doc) => ({ ...doc.data() })));

			setIsLoading(false);
		});
	}, []);

	const register = (email, password, username, radioValue) => {
		onAuthStateChanged(auth, (currentUser) => {
			try {
				setDoc(doc(db, 'users', currentUser.uid), {
					userID: currentUser.uid,
					email: email,
					password: password,
					username: username,
					setRadioValue: radioValue,
				});
			} catch (error) {
				console.log(error.message);
			}
		});

		return createUserWithEmailAndPassword(auth, email, password);
	};

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logOut = () => {
		return signOut(auth);
	};

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<ContextVariable.Provider
			value={{
				name,
				register,
				login,
				user,
				logOut,
				users,
				isLoading,
				handleShow,
				handleClose,
				show,
			}}
		>
			{children}
		</ContextVariable.Provider>
	);
};
