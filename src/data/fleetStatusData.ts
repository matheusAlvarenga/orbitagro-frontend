export interface FleetStatusDevice {
	device_id: number;
	name: string;
	status_label: string;
	last_location: { type: "Point"; coordinates: [number, number] } | null; // [lng, lat]
	steps: [number, number][]; // [[lng, lat], ...]
}

// Center point: lng=-47.9300, lat=-15.7700 — all devices within ~65m radius
export const FLEET_STATUS: FleetStatusDevice[] = [
	{
		device_id: 101,
		name: "TRC-101",
		status_label: "Em operação",
		last_location: { type: "Point", coordinates: [-47.93, -15.77] },
		steps: [
			[-47.9306, -15.7705],
			[-47.9303, -15.7703],
			[-47.93, -15.77],
		],
	},
	{
		device_id: 102,
		name: "TRC-102",
		status_label: "Em operação",
		last_location: { type: "Point", coordinates: [-47.9294, -15.7695] },
		steps: [
			[-47.93, -15.77],
			[-47.9297, -15.7698],
			[-47.9294, -15.7695],
		],
	},
	{
		device_id: 103,
		name: "TRC-103",
		status_label: "Parado - Aguardando instruções",
		last_location: { type: "Point", coordinates: [-47.9304, -15.7694] },
		steps: [
			[-47.9307, -15.7697],
			[-47.9306, -15.7695],
			[-47.9304, -15.7694],
		],
	},
];
