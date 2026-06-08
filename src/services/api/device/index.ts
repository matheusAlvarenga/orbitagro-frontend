import type { FleetDevice } from "../../../data/fleetData";
import {
	addDevice as addDeviceIntegration,
	deleteDevice as deleteDeviceIntegration,
	getDevices as getDevicesIntegration,
} from "./integration";
import {
	addDevice as addDeviceMock,
	deleteDevice as deleteDeviceMock,
	getDevices as getDevicesMock,
} from "./mock";

export type GetDevices = () => Promise<FleetDevice[]>;
export type AddDevicePayload = {
	farm_id: string;
	name: string;
	status: string;
};
export type AddDevice = (payload: AddDevicePayload) => Promise<FleetDevice>;

const useMocks = import.meta.env.VITE_USE_MOCKS === "true";

export const getDevices: GetDevices = useMocks
	? getDevicesMock
	: getDevicesIntegration;

export const addDevice: AddDevice = useMocks
	? addDeviceMock
	: addDeviceIntegration;

export type DeleteDevice = (id: string) => Promise<void>;

export const deleteDevice: DeleteDevice = useMocks
	? deleteDeviceMock
	: deleteDeviceIntegration;
