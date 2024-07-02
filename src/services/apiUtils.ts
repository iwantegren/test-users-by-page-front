import config from "../config";

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
