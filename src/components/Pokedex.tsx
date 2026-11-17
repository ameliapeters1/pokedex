import PokemonGrid from "./PokemonGrid"
import ResultCount from "./ResultCount"
import { type PokemonListItem } from "../types"
import { useEffect, useState } from "react";
import { idFromUrl } from "../lib/pokemon";


function Pokedex(){
    const [pokemon, setPokemon] = useState<PokemonListItem[]>([])

    useEffect(() => { 
        const fetchPokemon = async () => { 
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/pokemon?limit=20")
            
            if (!response.ok) {
                throw new Error("unable to fetch pokemon")
            }
            
            const data = await response.json()
            const pokemonList = data.results.map((pokemon: PokemonListItem) => (
                { ...pokemon, id: idFromUrl(pokemon.url)}))

            setPokemon(pokemonList)

        } catch (err) {
            console.error("error!", err)      
        } 
        }
        fetchPokemon()
    }, [])
    
    return (
    <main className="page">
        <h1>Pokemons!</h1>
        <ResultCount
        count = {pokemon.length}
        />
        <PokemonGrid
        pokemonCards={pokemon}/>
    
    </main>
    
    )
}

export default Pokedex