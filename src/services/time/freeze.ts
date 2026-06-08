export const freeze = async (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
