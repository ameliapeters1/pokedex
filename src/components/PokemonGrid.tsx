import { type Pokemon } from "../types"
import PokemonCard  from "./PokemonCard/PokemonCard"

interface PokemonGridProps{
    pokemonCards: Pokemon[]
}

function PokemonGrid(props: PokemonGridProps){
    const {pokemonCards} = props
    
    return(
        <ul className="pokemon-grid">
             {pokemonCards.map((pokemonCard)=> 
                (<PokemonCard 
                    key={pokemonCard.id}
                    id={pokemonCard.id}
                    name={pokemonCard.name}/>))}
        </ul>
    )
}

export default PokemonGrid