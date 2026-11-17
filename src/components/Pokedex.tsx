import { useState } from "react"
import { usePokemonList } from "../hooks/usePokemonLists"
import PokemonGrid from "./PokemonGrid"
import ResultCount from "./ResultCount"
import TypeSelect from "./TypeSelect"


function Pokedex(){
    const [type, setType] = useState("")
    const {pokemon, isLoading, error} = usePokemonList(type)
  

    return (
    <main className="page">
        <h1>Pokemons!</h1>

        {isLoading ? (<p>loading Pokemon...</p>): 
            error ? (<p>{error}</p>):
                pokemon.length ===0? (<p>No pokemon found</p>):
                (
                <>
                <TypeSelect value={type} onChange={setType}/>
                <ResultCount
                count = {pokemon.length}/>
                <PokemonGrid
                pokemonCards={pokemon}/>
                </>
        )}  
    </main> 
    )
}

export default Pokedex