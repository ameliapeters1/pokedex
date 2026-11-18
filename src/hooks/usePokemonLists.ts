import { useState, useEffect } from "react"
import {type PokemonListItem } from "../types"
import { idFromUrl } from "../lib/pokemon"
import { apiGet } from "../api/client";


interface listResponse {
    count: number; 
    next: string | null; 
    previous: string | null; 
    results: PokemonListItem[] 
}

interface typeResponse {
    pokemon: { 
        pokemon: { 
            name:string
            url:string } }[]
}


export function usePokemonList(type:string) {
      // state, effect, cleanup
        const [total, setTotal] = useState<number>(0)
        const [pokemon, setPokemon] = useState<PokemonListItem[]>([])
        const [isLoading, setIsLoading] = useState<boolean>(true)
        const [error, setError] = useState<string|null>(null)


          useEffect(() => { 
            // controller for cancelling outdated fetch requests
            const controller = new AbortController()
            const {signal} = controller
            // ignore for preventing previous requests from updating state
            let ignore = false

            const fetchPokemon = async () => {
                setIsLoading(true)
                setError(null)

            try { 
                const endpoint = type.length === 0 ? "/pokemon?limit=20" : `/type/${type}`

                let pokemonList: PokemonListItem[]
                let total: number
                
                if (type.length ===0){
                    const data: listResponse = await apiGet(endpoint, signal)
                    pokemonList = data.results.map((pokemon: PokemonListItem) => (
                    { ...pokemon, id: idFromUrl(pokemon.url)}))
                    total = data.count
                    
                } else{
                    const data: typeResponse = await apiGet(endpoint, signal)
                    pokemonList = data.pokemon.slice(0,24).map(({pokemon})=> ({...pokemon, id: idFromUrl(pokemon.url)}))
                    total = data.pokemon.length
                }

                if (!ignore){
                    setTotal(total)
                    setPokemon(pokemonList)
                }
                
                } catch (err) {
                    if (err instanceof Error && err.name === "AbortError") {
                        return
                    }
                    if (!ignore) {
                        console.error("Fetch failed:", err)
                        setError("Could not load Pokémon. Please try again.")
                    }
                } finally {
                    if (!ignore) {
                        setIsLoading(false)
                    }
                }
               
            }
            fetchPokemon()

            // cleanup function runs when type changes or component unmounts
            return () => {
                ignore = true
                controller.abort()
            }
        }, [type])

  return { pokemon, isLoading, error, total };
}