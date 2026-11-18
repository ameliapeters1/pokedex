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