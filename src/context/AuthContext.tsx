import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	type User,
} from "firebase/auth";
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { auth } from "../lib/firebase";

interface AuthContextValue {
	user: User | null;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const MOCK_USER = {
	uid: "mock-user",
	email: "dev@orbitagro.com",
	displayName: "Dev User",
} as unknown as User;

const useMocks = import.meta.env.VITE_USE_MOCKS === "true";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(useMocks ? MOCK_USER : null);
	const [loading, setLoading] = useState(!useMocks);

	useEffect(() => {
		if (useMocks) return;
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const login = async (email: string, password: string) => {
		if (useMocks) return;
		await signInWithEmailAndPassword(auth, email, password);
	};

	const register = async (email: string, password: string) => {
		if (useMocks) return;
		await createUserWithEmailAndPassword(auth, email, password);
	};

	const logout = async () => {
		if (useMocks) {
			setUser(null);
			return;
		}
		await signOut(auth);
	};

	return (
		<AuthContext.Provider value={{ user, loading, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextValue => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
	return ctx;
};
