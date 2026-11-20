import { useState, useEffect } from "react"
import { getPokemon } from "../api/pokemon"
import type { Pokemon } from "../types"

export function usePokemon(nameOrId: string) {
    // state, loading, event
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<String | null>(null)



    useEffect (() => {
        if (!nameOrId.trim()) {
            setPokemon(null)
            setIsLoading(false)
            setError(null)
            return
        }


    const controller = new AbortController()
    let ignore = false
    const fetchPokemon = async () => {
        setIsLoading(true)
        setError(null)

    try {
        const data = await getPokemon(nameOrId.trim(), controller.signal)
        if (!ignore) {setPokemon(data)}
    } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
            return
        }
        if (!ignore) {
            console.error("fetch failed: ", err)
            setError(`no pokemon called ${nameOrId}` )
        }
    }
    finally {
        if (!ignore) setIsLoading(false)
    }
}
    fetchPokemon()
        // cleanup function runs when type changes or component unmounts
        return () => {
            ignore = true
            controller.abort()
        }
    }, [nameOrId])
    return { pokemon, isLoading, error}
}