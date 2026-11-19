import { useState } from "react"
import { usePokemonList } from "../hooks/usePokemonLists"
import PokemonGrid from "./PokemonGrid"
import ResultCount from "./ResultCount"
import TypeSelect from "./TypeSelect"
import SearchBox from "./SearchBox"
import { getPokemon } from "../api/pokemon"
import type { PokemonListItem } from "../types"


function Pokedex(){
    const [type, setType] = useState("")
    const [search, setSearch] = useState("")
    const [searchedPokemon, setSearchedPokemon] = useState<PokemonListItem | null>(null);
    const [searchError, setSearchError] = useState("")

    const {pokemon, isLoading, error, total} = usePokemonList(type)

    async function handleSearch() {
        setSearchError("")
        setSearchedPokemon(null)

        if (!search.trim()) return

        try {
            const filteredPokemon = await getPokemon(search.trim())

            setSearchedPokemon({
                ...filteredPokemon,
                url: ""
            })
        } catch {
            setSearchError(`No Pokémon called "${search}"`)
        }
    }

    function handleSearchChange(value: string) {
        setSearch(value)
        setSearchedPokemon(null)
        setSearchError("")
    }
    
    return (
    <main className="page">
        <h1>Pokemons!</h1>
        <div className="search-controls">

            {!searchedPokemon && (<TypeSelect value={type} onChange={setType} />)}

            <SearchBox
                value={search}
                onChange={handleSearchChange}
                onSearch={handleSearch}
            />
        </div>

        {searchError ?    // if search fails, display error message
            (<p>{searchError}</p>):
            // if pokemon searched, just display that one
            searchedPokemon ? 
                (<>
                    <ResultCount count = {1} total = {1}/>
                    <PokemonGrid pokemonCards={[searchedPokemon]}/>
                </>) :
                // if list is still loading, display loading message
                isLoading ?
                    (<p>loading Pokemon...</p>) :
                    // if api error, display that error
                    error ? 
                        (<p>{error}</p>): 
                        // if no pokemon of selected type, display message
                        pokemon.length ===0 ? 
                            (<p>No pokemon found</p>):
                            // or display normal pokemon list
                            (
                            <>
                                <ResultCount
                                count = {pokemon.length}
                                total = {total}/>
                                <PokemonGrid pokemonCards={pokemon} />
                            </>
                            )
        }  
    </main> 
    )
}

export default Pokedex