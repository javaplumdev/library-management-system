import { createContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase-config';
import { collection, onSnapshot, setDoc, doc } from '@firebase/firestore';
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { toast } from 'react-hot-toast';

export const ContextVariable = createContext();

export const ContextFunction = ({ children }) => {
	const [name, setName] = useState('Charlito');
	const [users, setUsers] = useState({});
	const [booksData, setBookData] = useState({});
	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [show, setShow] = useState(false);
	const [bookGenre, setBookGenre] = useState('');

	useEffect(() => {
		onSnapshot(collection(db, 'users'), (snapshot) => {
			setUsers(snapshot.docs.map((doc) => ({ ...doc.data() })));

			setIsLoading(false);
		});

		onSnapshot(collection(db, 'books'), (snapshot) => {
			setBookData(snapshot.docs.map((doc) => ({ ...doc.data() })));

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

	const uploadBook = (
		bookID,
		bookName,
		bookAuthor,
		bookDescription,
		bookGenre,
		userID
	) => {
		if (
			bookName === '' ||
			!bookName.trim() ||
			bookAuthor === '' ||
			!bookAuthor.trim() ||
			bookDescription === '' ||
			!bookDescription.trim() ||
			bookGenre === ''
		) {
			toast.error('Please put');
		} else {
			setDoc(
				doc(db, 'books', bookID),
				{
					bookID: bookID,
					bookName: bookName,
					bookAuthor: bookAuthor,
					bookDescription: bookDescription,
					bookGenre: bookGenre,
					userID: userID,
				},
				{ merge: true }
			);

			toast.success('Uploaded');
			setBookGenre('');
			handleClose();
		}
	};

	const changeGenre = (e) => {
		setBookGenre(e);
	};

	return (
		<ContextVariable.Provider
			value={{
				booksData,
				bookGenre,
				changeGenre,
				uploadBook,
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
