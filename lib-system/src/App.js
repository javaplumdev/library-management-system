import { ContextFunction } from './context/context-config';
import Loginpage from './components/Loginpage';
import Register from './components/Register';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<ContextFunction>
			<div className="App">
				<Routes>
					<Route path="/" element={<Loginpage />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</div>
		</ContextFunction>
	);
}

export default App;
