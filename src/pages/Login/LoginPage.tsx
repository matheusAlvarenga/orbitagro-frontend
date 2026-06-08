import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { FormField } from "../../components/FormField/FormField";
import { useAuth } from "../../context/AuthContext";
import { getAuthErrorMessage } from "../../lib/authErrors";
import styles from "./LoginPage.module.css";

const EmailIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="17"
		height="14"
		viewBox="0 0 24 20"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<rect x="2" y="2" width="20" height="16" rx="2" />
		<path d="M2 6l10 7 10-7" />
	</svg>
);

const LockIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="14"
		height="20"
		viewBox="0 0 16 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<rect x="2" y="10" width="12" height="12" rx="2" />
		<path d="M5 10V7a3 3 0 0 1 6 0v3" />
	</svg>
);

const ShieldIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="11"
		height="14"
		viewBox="0 0 12 16"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<path d="M6 1L1 3.5V8c0 3 2.5 5.5 5 6.5 2.5-1 5-3.5 5-6.5V3.5L6 1z" />
		<path d="M3.5 8l1.5 1.5 3-3" />
	</svg>
);

export const LoginPage = () => {
	const { login } = useAuth();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			await login(email, password);
			navigate("/dashboard");
		} catch (err) {
			setError(getAuthErrorMessage(err));
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className={styles.page}>
			<div className={styles.container}>
				<div className={styles.card}>
					<header className={styles.header}>
						<h1 className={styles.logo}>OrbitAgro</h1>
						<p className={styles.subtitle}>
							A inteligência do espaço no coração da sua safra
						</p>
					</header>

					<form className={styles.form} onSubmit={handleSubmit}>
						<FormField
							id="email"
							label="E-mail Corporativo"
							type="email"
							placeholder="analista@fazenda.com"
							icon={<EmailIcon />}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<FormField
							id="password"
							label="Senha"
							type="password"
							placeholder="••••••••"
							icon={<LockIcon />}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{error && <p className={styles.error}>{error}</p>}
						<div className={styles.buttonWrapper}>
							<Button type="submit" disabled={loading}>
								{loading ? "Entrando..." : "Acessar Plataforma"}
							</Button>
						</div>
					</form>

					<footer className={styles.footer}>
						<p className={styles.footerText}>
							Ainda não possui uma conta?{" "}
							<Link to="/register" className={styles.footerLink}>
								Criar uma agora
							</Link>
						</p>
					</footer>
				</div>

				<div className={styles.trustBadge}>
					<ShieldIcon />
					<span>Conexão Segura &amp; Criptografada</span>
				</div>
			</div>
		</main>
	);
};
