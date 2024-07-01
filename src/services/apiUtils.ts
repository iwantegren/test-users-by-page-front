import config from "../config";

export async function getToken() {
  const response = await fetch(`${config.backendUrl}/token`, {
    method: "GET",
  });
  const data = await response.json();
  return data.token;
}

export async function createUser(data: FormData, token: string) {
  const response = await fetch(`${config.backendUrl}/users`, {
    method: "POST",
    headers: {
      token,
    },
    body: data,
  });

  console.log({ response });

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    throw new Error("Failed to submit form");
  }
}
