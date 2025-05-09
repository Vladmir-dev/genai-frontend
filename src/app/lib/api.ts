import axios, { AxiosError } from "axios";

const API_BASE_URL = "http://localhost:8001/api/v1";

interface QueryResponse {
  response: string;
}

export async function submitQuery(question: string): Promise<QueryResponse> {
  try {
    const response = await axios.post<QueryResponse>(
      `${API_BASE_URL}/query`,
      { question },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.detail || "Failed to fetch response");
    }
    throw new Error("Network error");
  }
}