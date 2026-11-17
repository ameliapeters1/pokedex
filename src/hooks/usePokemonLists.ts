import { useState, useEffect } from "react"
import {type PokemonListItem } from "../types"
import { idFromUrl } from "../lib/pokemon"


interface listResponse {
    count: number; 
    next: string | null; 
    previous: string | null; 
    results: PokemonListItem[] 
}



export function usePokemonList() {
      // state, effect, cleanup
 
          const [pokemon, setPokemon] = useState<PokemonListItem[]>([])
          const [isLoading, setIsLoading] = useState<boolean>(true)
          const [error, setError] = useState<string|null>(null)
          useEffect(() => { 
              const fetchPokemon = async () => { 
                  setIsLoading(true)
                  setError(null)
                  try {
                      const response = await fetch(import.meta.env.VITE_API_URL + "/pokemon?limit=20")
                      
                      if (!response.ok) {
                          throw new Error(`Could not load Pokémon (${response.status})`)
                      }
                      
                      const data: listResponse = await response.json()
                      const pokemonList = data.results.map((pokemon: PokemonListItem) => (
                          { ...pokemon, id: idFromUrl(pokemon.url)}))
      
                      setPokemon(pokemonList)
      
                  } catch (err) {
                       if (err instanceof Error) {
                          console.error("fetch failed: ", err.message)
                          } 
                      setError("Could not load Pokémon. Please try again.")    
                  } finally{
                      setIsLoading(false)
                  }
                  }
                  fetchPokemon()
          }, [])
  return { pokemon, isLoading, error };
}