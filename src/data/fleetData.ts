export interface FleetDevice {
	id: number;
	name: string;
	farm_name: string;
	status: string;
}

export const FLEET: FleetDevice[] = [
	{
		id: 1,
		name: "Trator JD-8R 370",
		farm_name: "Fazenda Boa Esperança",
		status: "Ativo",
	},
	{
		id: 2,
		name: "Caminhão Volvo FH 540",
		farm_name: "Vale do Sol",
		status: "Em Trânsito",
	},
	{
		id: 3,
		name: "Colheitadeira S790",
		farm_name: "Fazenda São Jorge",
		status: "Manutenção",
	},
	{
		id: 4,
		name: "Pulverizador Patriot 350",
		farm_name: "Fazenda Boa Esperança",
		status: "Offline",
	},
];
