import { freeze } from "../../time/freeze";
import type { AddFarm, GetFarms } from ".";

export const getFarms: GetFarms = async () => {
	await freeze(1000);

	return [
		{ _id: 1, name: "Fazenda Santa Helena", state: "MT", city: "Sorriso" },
		{ _id: 2, name: "Veredas do Sul", state: "GO", city: "Rio Verde" },
		{ _id: 3, name: "Estrela Dalva", state: "PR", city: "Cascavel" },
	];
};

export const addFarm: AddFarm = async (payload) => {
	await freeze(5000);
	return { _id: Date.now(), ...payload };
};
