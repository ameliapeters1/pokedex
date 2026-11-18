import { useState, useEffect } from "react"
import {type PokemonListItem } from "../types"
import { getPokemonList } from "../api/pokemon";


export function usePokemonList(type:string) {
      // state, effect, cleanup
        const [total, setTotal] = useState<number>(0)
        const [pokemon, setPokemon] = useState<PokemonListItem[]>([])
        const [isLoading, setIsLoading] = useState<boolean>(true)
        const [error, setError] = useState<string|null>(null)


          useEffect(() => { 
            // controller for cancelling outdated fetch requests
            const controller = new AbortController()
            // ignore for preventing previous requests from updating state
            let ignore = false

            const fetchPokemon = async () => {
                setIsLoading(true)
                setError(null)

            try { 
                const data = await getPokemonList({type}, controller.signal)
               
                if (!ignore){
                    setTotal(data.total)
                    setPokemon(data.pokemon)
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