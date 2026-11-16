import PokemonGrid from "./PokemonGrid"
import ResultCount from "./ResultCount"
import { type PokemonListItem } from "../types"
import { useEffect, useState } from "react";


function Pokedex(){
    const [pokemons, setPokemon] = useState<PokemonListItem[]>([])

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