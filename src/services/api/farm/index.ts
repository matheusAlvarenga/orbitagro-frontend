import type { Farm } from "../../../data/farmData";
import {
	addFarm as addFarmIntegration,
	getFarms as getFarmsIntegration,
} from "./integration";
import { addFarm as addFarmMock, getFarms as getFarmsMock } from "./mock";

const useMocks = import.meta.env.VITE_USE_MOCKS === "true";

export const getFarms = useMocks ? getFarmsMock : getFarmsIntegration;
export const addFarm = useMocks ? addFarmMock : addFarmIntegration;

export type GetFarmsResponse = Farm[];
export type GetFarms = () => Promise<GetFarmsResponse>;

export type AddFarmPayload = { name: string; state: string; city: string };
export type AddFarm = (payload: AddFarmPayload) => Promise<Farm>;
