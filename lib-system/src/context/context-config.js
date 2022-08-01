import { createContext, useState } from 'react';

export const ContextVariable = createContext();

export const ContextFunction = ({ children }) => {
	const [name, setName] = useState('Charlito');

	console.log(name);

	return (
		<ContextVariable.Provider value={{ name }}>
			{children}
		</ContextVariable.Provider>
	);
};
