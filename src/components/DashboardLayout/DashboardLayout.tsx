import type { ReactNode } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { TopBar } from "../TopBar/TopBar";
import styles from "./DashboardLayout.module.css";

interface DashboardLayoutProps {
	title: string;
	children: ReactNode;
}

export const DashboardLayout = ({ title, children }: DashboardLayoutProps) => {
	return (
		<div className={styles.layout}>
			<Sidebar />
			<div className={styles.main}>
				<TopBar title={title} />
				<div className={styles.content}>{children}</div>
			</div>
		</div>
	);
};
