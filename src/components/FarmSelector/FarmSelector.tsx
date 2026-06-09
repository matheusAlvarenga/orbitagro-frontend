import { useEffect, useRef, useState } from "react";
import { useFarm } from "../../context/FarmContext";
import { useFarms } from "../../context/FarmsContext";
import styles from "./FarmSelector.module.css";

const FarmIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="18"
		height="14"
		viewBox="0 0 22 17"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<path d="M1 16V7L11 1l10 6v9" />
		<path d="M8 16v-6h6v6" />
		<rect x="3" y="9" width="3" height="3" />
		<rect x="16" y="9" width="3" height="3" />
	</svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="12"
		height="8"
		viewBox="0 0 12 8"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
		style={{
			transform: open ? "rotate(180deg)" : "none",
			transition: "transform 0.2s",
		}}
	>
		<path d="M1 1l5 5 5-5" />
	</svg>
);

export const FarmSelector = () => {
	const { selectedFarmId, setSelectedFarmId } = useFarm();
	const { farms, loading, error } = useFarms();
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const selectedFarm =
		farms.find((f) => String(f._id) === selectedFarmId) ?? null;

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className={styles.wrapper} ref={ref}>
			<button
				type="button"
				className={styles.trigger}
				onClick={() => setOpen((v) => !v)}
				aria-haspopup="listbox"
				aria-expanded={open}
			>
				<span className={styles.triggerLeft}>
					<FarmIcon />
					<span>{selectedFarm ? selectedFarm.name : "Selecionar Fazenda"}</span>
				</span>
				<ChevronIcon open={open} />
			</button>

			{open && (
				<div className={styles.dropdown} role="listbox">
					{loading ? (
						<div className={styles.statusOption}>Carregando fazendas...</div>
					) : error ? (
						<div className={styles.errorOption}>{error}</div>
					) : farms.length === 0 ? (
						<div className={styles.statusOption}>
							Nenhuma fazenda cadastrada
						</div>
					) : (
						farms.map((farm) => (
							<div
								key={farm._id}
								role="option"
								tabIndex={0}
								aria-selected={String(farm._id) === selectedFarmId}
								className={`${styles.option} ${
									String(farm._id) === selectedFarmId ? styles.optionActive : ""
								}`}
								onClick={() => {
									setSelectedFarmId(String(farm._id));
									setOpen(false);
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										setSelectedFarmId(String(farm._id));
										setOpen(false);
									}
								}}
							>
								{farm.name}
							</div>
						))
					)}
				</div>
			)}
		</div>
	);
};
