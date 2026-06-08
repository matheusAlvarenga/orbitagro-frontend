import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { LoginPage } from "./pages/Login/LoginPage";
import { MapPage } from "./pages/Map/MapPage";
import { RegisterPage } from "./pages/Register/RegisterPage";

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route element={<ProtectedRoute />}>
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/map" element={<MapPage />} />
			</Route>
		</Routes>
	);
};
