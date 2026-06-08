import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login/LoginPage";

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<LoginPage />} />
		</Routes>
	);
};
