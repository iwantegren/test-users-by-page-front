import config from "../config";
import { PositionDto } from "../types/positionDto";

export async function getToken() {
  const response = await fetch(`${config.backendUrl}/token`, {
    method: "GET",
  });
  const data = await response.json();
  return data.token;
}

export async function createUser(body: FormData, token: string) {
  const response = await fetch(`${config.backendUrl}/users`, {
    method: "POST",
    headers: {
      token,
    },
    body,
  });

  const result = await response.json();

  if (response.ok) {
    return {
      status: response.status,
      data: result,
    };
  } else {
    return {
      status: response.status,
      error: result,
    };
  }
}

export async function getPositions(): Promise<PositionDto[]> {
  const response = await fetch(`${config.backendUrl}/positions`, {
    method: "GET",
  });

  if (response.ok) {
    const result = await response.json();
    return result.positions;
  } else {
    throw new Error("Failed to fetch positions");
  }
}

export function createPageLink(page: number, count: number) {
  return `${config.backendUrl}/users?page=${page}&count=${count}`;
}

export async function getUsers(link: string) {
  const response = await fetch(link, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
