export interface FleetDevice {
	_id: string;
	farm_id: string;
	name: string;
	status: string;
}

export const FLEET: FleetDevice[] = [
	{
		_id: "1",
		farm_id: "farm-1",
		name: "Trator JD-8R 370",
		status: "Ativo",
	},
	{
		_id: "2",
		farm_id: "farm-2",
		name: "Caminhão Volvo FH 540",
		status: "Em Trânsito",
	},
	{
		_id: "3",
		farm_id: "farm-1",
		name: "Colheitadeira S790",
		status: "Manutenção",
	},
	{
		_id: "4",
		farm_id: "farm-1",
		name: "Pulverizador Patriot 350",
		status: "Offline",
	},
];
