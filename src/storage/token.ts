

export const readToken = (): string | null => {
    try {
        return localStorage.getItem("pokedex.token")
    } catch {
        return null
    }
}

export const writeToken = (token: string): void => {
    try {
        return localStorage.setItem("pokedex.token", token)
    } catch {}
}

export const clearToken = (): void => {
    try {
        localStorage.removeItem("pokedex.token")
    } catch {}
}