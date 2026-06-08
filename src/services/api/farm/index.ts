import type { Farm } from "../../../data/farmData";
import {
	addFarm as addFarmIntegration,
	deleteFarm as deleteFarmIntegration,
	getFarms as getFarmsIntegration,
} from "./integration";
import {
	addFarm as addFarmMock,
	deleteFarm as deleteFarmMock,
	getFarms as getFarmsMock,
} from "./mock";

const useMocks = import.meta.env.VITE_USE_MOCKS === "true";

export const getFarms = useMocks ? getFarmsMock : getFarmsIntegration;
export const addFarm = useMocks ? addFarmMock : addFarmIntegration;
export const deleteFarm = useMocks ? deleteFarmMock : deleteFarmIntegration;

export type GetFarmsResponse = Farm[];
export type GetFarms = () => Promise<GetFarmsResponse>;

export type AddFarmPayload = { name: string; state: string; city: string };
export type AddFarm = (payload: AddFarmPayload) => Promise<Farm>;

export type DeleteFarm = (id: number) => Promise<void>;
