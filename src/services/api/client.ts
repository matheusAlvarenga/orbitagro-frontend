const baseUrl = import.meta.env.VITE_API_BASE_URL;

const defaultHeaders: HeadersInit = {
	"Content-Type": "application/json",
	"x-api-key": "$2a$12$s1LAIXtJ2DQWEQPY21iSWOXjyC3srqFkWMbt5AiDxOgXhyJ4HqT7S",
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
	const response = await fetch(`${baseUrl}${path}`, {
		...init,
		headers: { ...defaultHeaders, ...init?.headers },
	});

	if (!response.ok) throw new Error(`HTTP ${response.status}: ${path}`);

	if (response.status === 204) {
		return {} as T;
	}

	const text = await response.text();
	if (!text.trim()) {
		return {} as T;
	}

	try {
		const parsed = JSON.parse(text);
		return (parsed?.body ?? parsed) as T;
	} catch {
		return {} as T;
	}
}

async function requestData<T>(path: string): Promise<T> {
	const response = await fetch(`${baseUrl}${path}`, {
		headers: defaultHeaders,
	});

	if (!response.ok) throw new Error(`HTTP ${response.status}: ${path}`);

	if (response.status === 204) {
		return {} as T;
	}

	const text = await response.text();
	if (!text.trim()) {
		return {} as T;
	}

	try {
		const parsed = JSON.parse(text);
		return (parsed?.data ?? parsed) as T;
	} catch {
		return {} as T;
	}
}

export const apiClient = {
	get: <T>(path: string) => request<T>(path),
	getData: <T>(path: string) => requestData<T>(path),
	post: <T>(path: string, data: unknown) =>
		request<T>(path, { method: "POST", body: JSON.stringify(data) }),
	delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
