import { ContextFunction } from './context/context-config';
import Loginpage from './components/Loginpage';
import Register from './components/Register';
import Home from './components/Home';
import AdminPage from './components/AdminPage';
import Member from './components/Member';
import ProtectedRoute from './components/ProtectedRoute';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import BookDetails from './components/admin components/BookDetails';

function App() {
	document.body.classList.add('background-dark');

	return (
		<ContextFunction>
			<div className="App">
				<Toaster />
				<Routes>
					<Route path="/" element={<Loginpage />} />
					<Route path="/register" element={<Register />} />

					<Route
						path="/home"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin"
						element={
							<ProtectedRoute>
								<AdminPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/member"
						element={
							<ProtectedRoute>
								<Member />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/details/:id"
						element={
							<ProtectedRoute>
								<BookDetails />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</div>
		</ContextFunction>
	);
}

export default App;
