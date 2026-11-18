import { useState } from "react"
import { usePokemonList } from "../hooks/usePokemonLists"
import PokemonGrid from "./PokemonGrid"
import ResultCount from "./ResultCount"
import TypeSelect from "./TypeSelect"


function Pokedex(){
    const [type, setType] = useState("")
    const {pokemon, isLoading, error, total} = usePokemonList(type)
  

    return (
    <main className="page">
        <h1>Pokemons!</h1>
        <TypeSelect value={type} onChange={setType}/>

        {isLoading ? (<p>loading Pokemon...</p>): 
            error ? (<p>{error}</p>):
                pokemon.length ===0? (<p>No pokemon found</p>):
                (
                <>
                <ResultCount
                count = {pokemon.length}
                total = {total}/>
                <PokemonGrid
                pokemonCards={pokemon}/>
                </>
        )}  
    </main> 
    )
}

export default Pokedex