import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { CreateFarmPage } from "./pages/CreateFarm/CreateFarmPage";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { FarmsPage } from "./pages/Farms/FarmsPage";
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
				<Route path="/farms" element={<FarmsPage />} />
				<Route path="/farms/create" element={<CreateFarmPage />} />
			</Route>
		</Routes>
	);
};
