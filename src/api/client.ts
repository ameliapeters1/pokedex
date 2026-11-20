import { writeToken } from "../storage/token";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const apiGet = async <T>(
  path: string,
  signal?: AbortSignal,
): Promise<T> => {
    const response = await fetch(import.meta.env.VITE_API_URL + path, {signal})                
    if (!response.ok) {
        throw new ApiError(`Could not load Pokémon (${response.status})`, response.status)
    }
    return(
        response.json() as Promise<T>
    )

};


async function login(email: string, password: string) {
  const response = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 401) {
    throw new Error("Invalid email or password");
  }
  if (!response.ok) throw new Error("Unable to log in, please try again");

  const { access_token } = await response.json();
  writeToken(access_token)
}


export async function register(email: string, password: string) {
  const response = await fetch(
    `${import.meta.env.VITE_AUTH_API_URL}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    },
  );

  if (response.status === 409) {
    throw new Error("That email is already registered");
  }
  if (!response.ok) throw new Error("Unable to sign up, please try again");

  login(email,password)
}

