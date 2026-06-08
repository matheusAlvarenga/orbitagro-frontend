import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";
import { ToastList } from "../components/Toast/Toast";

interface Toast {
	id: string;
	message: string;
	type: "success" | "error";
}

interface ToastContextValue {
	showToast: (message: string, type?: Toast["type"]) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const dismiss = useCallback((id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);

	const showToast = useCallback(
		(message: string, type: Toast["type"] = "success") => {
			const id = `${Date.now()}-${Math.random()}`;
			setToasts((prev) => [...prev.slice(-2), { id, message, type }]);
			setTimeout(() => dismiss(id), 4000);
		},
		[dismiss],
	);

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<ToastList toasts={toasts} />
		</ToastContext.Provider>
	);
};

export const useToast = (): ToastContextValue => {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error("useToast must be used inside ToastProvider");
	return ctx;
};
