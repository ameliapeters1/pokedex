import PokemonGrid from "./PokemonGrid"
import ResultCount from "./ResultCount"


function Pokedex(){
    const pokemons = [
        {id:1, name:"Bulbasaur"},
        {id:4, name:"Charmander"},
        {id:7, name:"Squirtle"}
    ]

    return (
    <>
        <h1>Pokemons!</h1>
        <ResultCount
        count = {pokemons.length}
        />
        <PokemonGrid
        pokemonCards={pokemons}/>
    </>
       
    )
}

export default Pokedex