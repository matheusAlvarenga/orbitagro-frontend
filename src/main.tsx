import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { FarmProvider } from "./context/FarmContext.tsx";
import { FarmsProvider } from "./context/FarmsContext.tsx";
import { FleetProvider } from "./context/FleetContext.tsx";
import { FleetStatusProvider } from "./context/FleetStatusContext.tsx";
import { TelemetryProvider } from "./context/TelemetryContext.tsx";
import { ToastProvider } from "./context/ToastContext.tsx";

// biome-ignore lint/style/noNonNullAssertion: the root element is guaranteed to exist
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ToastProvider>
					<FarmProvider>
						<FarmsProvider>
							<FleetProvider>
								<FleetStatusProvider>
									<TelemetryProvider>
										<App />
									</TelemetryProvider>
								</FleetStatusProvider>
							</FleetProvider>
						</FarmsProvider>
					</FarmProvider>
				</ToastProvider>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
);
