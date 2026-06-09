import { FARMS } from "../../../data/farmData";
import { freeze } from "../../time/freeze";
import type { AddFarm, DeleteFarm, GetFarms } from ".";

export const getFarms: GetFarms = async () => {
	await freeze(1000);
	return FARMS;
};

export const addFarm: AddFarm = async (payload) => {
	await freeze(5000);
	return { _id: crypto.randomUUID(), ...payload };
};

export const deleteFarm: DeleteFarm = async (_id) => {
	await freeze(1000);
};
