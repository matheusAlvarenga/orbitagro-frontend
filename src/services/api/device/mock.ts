import { FLEET } from "../../../data/fleetData";
import { freeze } from "../../time/freeze";
import type { AddDevice, DeleteDevice, GetDevices } from ".";

export const getDevices: GetDevices = async () => {
	await freeze(1000);
	return FLEET;
};

export const addDevice: AddDevice = async (payload) => {
	await freeze(1000);
	return { _id: crypto.randomUUID(), ...payload };
};

export const deleteDevice: DeleteDevice = async (_id) => {
	await freeze(1000);
};
