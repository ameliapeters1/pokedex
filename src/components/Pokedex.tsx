import { usePokemonList } from "../hooks/usePokemonLists"
import PokemonGrid from "./PokemonGrid"
import ResultCount from "./ResultCount"


function Pokedex(){
    const {pokemon, isLoading, error} = usePokemonList()

    return (
    <main className="page">
        <h1>Pokemons!</h1>

        {isLoading ? (<p>loading Pokemon...</p>): 
            error ? (<p>{error}</p>):
                pokemon.length ===0? (<p>No pokemon found</p>):
                (
                <>
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