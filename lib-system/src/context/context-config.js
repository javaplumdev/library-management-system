import { createContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase-config';
import {
	collection,
	onSnapshot,
	setDoc,
	doc,
	query,
	serverTimestamp,
	orderBy,
	deleteDoc,
} from '@firebase/firestore';
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export const ContextVariable = createContext();

export const ContextFunction = ({ children }) => {
	const [name, setName] = useState('Charlito');
	const [users, setUsers] = useState({});
	const [booksData, setBookData] = useState({});
	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [show, setShow] = useState(false);
	const [bookGenre, setBookGenre] = useState('');
	const [filterCategory, setFilterCategory] = useState('All');
	const [pendingRequestData, setPendingRequestData] = useState({});
	const [userCollection, setUserCollection] = useState({});

	let navigate = useNavigate();

	const getCategory =
		booksData?.filter &&
		booksData.filter((item) => item.bookGenre === filterCategory);

	useEffect(() => {
		const queryBooksData = query(
			collection(db, 'books'),
			orderBy('timestamp', 'desc')
		);

		onSnapshot(collection(db, 'users'), (snapshot) => {
			setUsers(snapshot.docs.map((doc) => ({ ...doc.data() })));

			setIsLoading(false);
		});

		onSnapshot(queryBooksData, (snapshot) => {
			setBookData(snapshot.docs.map((doc) => ({ ...doc.data() })));

			setIsLoading(false);
		});

		onSnapshot(collection(db, 'pending-requests'), (snapshot) => {
			setPendingRequestData(snapshot.docs.map((doc) => ({ ...doc.data() })));
		});

		onSnapshot(collection(db, 'user-collection'), (snapshot) => {
			setUserCollection(snapshot.docs.map((doc) => ({ ...doc.data() })));
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
		userID,
		bookCopies
	) => {
		if (
			bookName === '' ||
			!bookName.trim() ||
			bookAuthor === '' ||
			!bookAuthor.trim() ||
			bookDescription === '' ||
			!bookDescription.trim() ||
			bookGenre === '' ||
			parseInt(bookCopies) === 0
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
					bookCopies: parseInt(bookCopies),
					timestamp: serverTimestamp(),
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

	const deleteBook = async (e) => {
		navigate('/admin');

		await deleteDoc(doc(db, 'books', e));

		toast.success('Book deleted');
	};

	const requestBook = async (userID, bookID) => {
		let pendingID = uuidv4();

		const findPendingRequestData =
			pendingRequestData?.find &&
			pendingRequestData.find(
				(item) => item.bookRequesting === bookID && item.userID === user.uid
			);

		if (findPendingRequestData) {
			toast.success('Request removed');
			await deleteDoc(
				doc(db, 'pending-requests', findPendingRequestData.pendingRequestID)
			);
		} else {
			toast.success('Request added');
			setDoc(doc(db, 'pending-requests', pendingID), {
				userID: userID,
				bookRequesting: bookID,
				pendingRequestID: pendingID,
				isGranted: false,
			});
		}
	};

	const confirmBorrow = async (userID, bookRequesting, pendingRequestID) => {
		let userCollectionID = uuidv4();

		setDoc(doc(db, 'user-collection', userCollectionID), {
			owner: userID,
			bookRequesting: bookRequesting,
		});

		booksData.map((item) => {
			if (item.bookID === bookRequesting) {
				if (item.bookCopies.length <= 0) {
					toast.error('No more copies left.');
				} else {
					setDoc(
						doc(db, 'books', bookRequesting),
						{
							bookCopies: item.bookCopies - 1,
						},
						{ merge: true }
					);
				}
			}
		});

		await deleteDoc(doc(db, 'pending-requests', pendingRequestID));
	};

	return (
		<ContextVariable.Provider
			value={{
				userCollection,
				confirmBorrow,
				pendingRequestData,
				requestBook,
				getCategory,
				filterCategory,
				setFilterCategory,
				deleteBook,
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
