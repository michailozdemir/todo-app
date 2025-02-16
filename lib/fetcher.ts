interface APIErrorResponse {
  message: string;
  status: number;
  data?: unknown;
}

export async function fetcher<TResponse>(
  url: string,
  options: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: Record<string, unknown>;
    headers?: Record<string, string>;
  } = {}
): Promise<TResponse> {
  const { method = "GET", body, headers = {} } = options;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw Error(data.message || "An error occurred");
  }

  return data as TResponse;
}
