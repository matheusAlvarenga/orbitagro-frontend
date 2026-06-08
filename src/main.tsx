import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { FarmProvider } from "./context/FarmContext.tsx";
import { FarmsProvider } from "./context/FarmsContext.tsx";

// biome-ignore lint/style/noNonNullAssertion: the root element is guaranteed to exist
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<FarmProvider>
					<FarmsProvider>
						<App />
					</FarmsProvider>
				</FarmProvider>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
);
