import type { Map as LeafletMap } from "leaflet";
import { Fragment, useEffect, useMemo, useRef } from "react";
import "leaflet/dist/leaflet.css";
import {
	CircleMarker,
	MapContainer,
	Polygon,
	Polyline,
	TileLayer,
	Tooltip,
	useMap,
} from "react-leaflet";
import { useFarm } from "../../context/FarmContext";
import { useFarms } from "../../context/FarmsContext";
import { useFleetStatus } from "../../context/FleetStatusContext";
import { getDeviceColor } from "../../utils/deviceColors";
import styles from "./MapPlaceholder.module.css";

const PolygonFitter = ({ coords }: { coords: [number, number][] }) => {
	const map = useMap();
	useEffect(() => {
		if (coords.length >= 3) map.fitBounds(coords, { padding: [32, 32] });
	}, [map, coords]);
	return null;
};

export const MapPlaceholder = () => {
	const { farms } = useFarms();
	const { selectedFarmId } = useFarm();
	const { fleetStatus } = useFleetStatus();
	const mapRef = useRef<LeafletMap | null>(null);

	const farm = farms.find((f) => String(f._id) === selectedFarmId) ?? null;
	const polygonCoords = useMemo<[number, number][]>(
		() =>
			farm?.polygon?.[0]?.map(([lng, lat]) => [lat, lng] as [number, number]) ??
			[],
		[farm],
	);

	return (
		<div className={styles.container}>
			<MapContainer
				ref={mapRef}
				center={[-14, -51]}
				zoom={4}
				zoomControl={false}
				style={{ height: "100%", width: "100%" }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{polygonCoords.length >= 3 && (
					<>
						<PolygonFitter coords={polygonCoords} />
						<Polygon
							positions={polygonCoords}
							pathOptions={{
								color: "#0d631b",
								weight: 2,
								fillOpacity: 0.15,
							}}
						/>
					</>
				)}
				{fleetStatus.map((device, index) => {
					const [lng, lat] = device.last_location.coordinates;
					const color = getDeviceColor(index);
					const steps: [number, number][] = device.steps.map(([sLng, sLat]) => [
						sLat,
						sLng,
					]);
					return (
						<Fragment key={device.device_id}>
							{steps.length >= 2 && (
								<Polyline
									positions={steps}
									pathOptions={{ color, weight: 2, dashArray: "4 4" }}
								/>
							)}
							<CircleMarker
								center={[lat, lng]}
								radius={7}
								pathOptions={{
									color,
									fillColor: color,
									fillOpacity: 1,
									weight: 2,
								}}
							>
								<Tooltip permanent direction="top" offset={[0, -10]}>
									{device.name}
								</Tooltip>
							</CircleMarker>
						</Fragment>
					);
				})}
			</MapContainer>

			<div className={styles.legend}>
				<span className={styles.legendItem}>
					<span className={styles.dotGreen} />
					Ativo
				</span>
				<span className={styles.legendItem}>
					<span className={styles.dotOrange} />
					Alerta
				</span>
			</div>

			<div className={styles.controls}>
				<button
					type="button"
					className={styles.controlBtn}
					aria-label="Aproximar"
					onClick={() => mapRef.current?.zoomIn()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						aria-hidden="true"
					>
						<line x1="12" y1="5" x2="12" y2="19" />
						<line x1="5" y1="12" x2="19" y2="12" />
					</svg>
				</button>
				<span className={styles.controlDivider} />
				<button
					type="button"
					className={styles.controlBtn}
					aria-label="Afastar"
					onClick={() => mapRef.current?.zoomOut()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						aria-hidden="true"
					>
						<line x1="5" y1="12" x2="19" y2="12" />
					</svg>
				</button>
				<span className={styles.controlDivider} />
				<button
					type="button"
					className={styles.controlBtn}
					aria-label="Camadas"
				>
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
						<polygon points="12 2 2 7 12 12 22 7 12 2" />
						<polyline points="2 17 12 22 22 17" />
						<polyline points="2 12 12 17 22 12" />
					</svg>
				</button>
			</div>
		</div>
	);
};
