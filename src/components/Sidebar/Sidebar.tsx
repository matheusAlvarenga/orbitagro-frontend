import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const LeafIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="17"
		height="17"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<path d="M2 22c4-4 6.5-8.5 6-14 5 0 10 3 12 8-3 4-8 6-14 6z" />
		<path d="M2 22L12 12" />
	</svg>
);

const DashboardIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<rect x="3" y="3" width="7" height="7" rx="1" />
		<rect x="14" y="3" width="7" height="7" rx="1" />
		<rect x="3" y="14" width="7" height="7" rx="1" />
		<rect x="14" y="14" width="7" height="7" rx="1" />
	</svg>
);

const MapIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
		<line x1="8" y1="2" x2="8" y2="18" />
		<line x1="16" y1="6" x2="16" y2="22" />
	</svg>
);

const FarmIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
		<polyline points="9 22 9 12 15 12 15 22" />
	</svg>
);

const UserIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="22"
		height="22"
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

export const Sidebar = () => {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.logoSection}>
				<div className={styles.logoRow}>
					<LeafIcon />
					<span className={styles.logoText}>OrbitAgro</span>
				</div>
				<span className={styles.logoSubtitle}>Precision Monitoring</span>
			</div>

			<nav className={styles.nav}>
				<NavLink
					to="/dashboard"
					className={({ isActive }) =>
						`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
					}
				>
					<DashboardIcon />
					<span>Painel de controle</span>
				</NavLink>
				<NavLink
					to="/map"
					className={({ isActive }) =>
						`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
					}
				>
					<MapIcon />
					<span>Mapa das Fazendas</span>
				</NavLink>
				<NavLink
					to="/farms"
					className={({ isActive }) =>
						`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
					}
				>
					<FarmIcon />
					<span>Minhas fazendas</span>
				</NavLink>
			</nav>

			<div className={styles.userSection}>
				<div className={styles.avatar}>
					<UserIcon />
				</div>
				<div className={styles.userInfo}>
					<span className={styles.userName}>Admin User</span>
					<span className={styles.userRole}>Administrator</span>
				</div>
			</div>
		</aside>
	);
};
