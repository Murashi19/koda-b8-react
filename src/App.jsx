/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./router";
import "./index.css";
import AuthContext from "./context/AuthContext";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
	const [auth, setAuth] = useState();
	const [users] = useLocalStorage("users");
	useEffect(() => {
		if (users) {
			setAuth(users);
		}
	}, [users, setAuth]);
	return (
		<>
			<AuthContext.Provider value={{ auth, setAuth }}>
				<RouterProvider router={router} />
			</AuthContext.Provider>
		</>
	);
}

export default App;
