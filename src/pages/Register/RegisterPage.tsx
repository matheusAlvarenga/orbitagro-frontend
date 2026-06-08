import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { FormField } from "../../components/FormField/FormField";
import styles from "./RegisterPage.module.css";

const UserIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<circle cx="12" cy="8" r="4" />
		<path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
	</svg>
);

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

const LockCheckIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="14"
		height="16"
		viewBox="0 0 16 18"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<rect x="2" y="8" width="12" height="10" rx="2" />
		<path d="M5 8V5.5a3 3 0 0 1 6 0V8" />
		<path d="M5.5 13l1.5 1.5 3-3" />
	</svg>
);

export const RegisterPage = () => {
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

					<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
						<FormField
							id="name"
							label="Nome Completo"
							type="text"
							placeholder="Como devemos chamar você?"
							icon={<UserIcon />}
						/>
						<FormField
							id="email"
							label="E-mail"
							type="email"
							placeholder="Digite seu melhor e-mail"
							icon={<EmailIcon />}
						/>
						<FormField
							id="password"
							label="Senha"
							type="password"
							placeholder="••••••••"
							icon={<LockIcon />}
						/>
						<FormField
							id="confirmPassword"
							label="Confirmação de Senha"
							type="password"
							placeholder="••••••••"
							icon={<LockCheckIcon />}
						/>
						<div className={styles.buttonWrapper}>
							<Button type="submit" showArrow={false}>
								Criar Conta
							</Button>
						</div>
					</form>

					<footer className={styles.footer}>
						<p className={styles.footerText}>
							Já possui uma conta?{" "}
							<Link to="/" className={styles.footerLink}>
								Entrar
							</Link>
						</p>
					</footer>
				</div>
			</div>
		</main>
	);
};
