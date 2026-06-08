const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = import.meta.env.VITE_API_TOKEN;

const defaultHeaders: HeadersInit = {
	"Content-Type": "application/json",
	"x-api-key": `Bearer ${token}`,
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
	const response = await fetch(`${baseUrl}${path}`, {
		...init,
		headers: { ...defaultHeaders, ...init?.headers },
	});

	if (!response.ok) throw new Error(`HTTP ${response.status}: ${path}`);

	const { body } = await response.json();
	return body as T;
}

export const apiClient = {
	get: <T>(path: string) => request<T>(path),
	post: <T>(path: string, data: unknown) =>
		request<T>(path, { method: "POST", body: JSON.stringify(data) }),
	delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
