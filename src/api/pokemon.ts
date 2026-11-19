import type { PokemonListItem, Pokemon} from "../types";
import { apiGet } from "./client";
import { idFromUrl } from "../lib/pokemon";


interface listResponse {
    count: number; 
    next: string | null; 
    previous: string | null; 
    results: PokemonListItem[] 
}

interface typeResponse {
    pokemon: { 
        pokemon: { 
            name:string
            url:string } }[]
}

export interface PokemonQuery {
  type?: string;
}

export const getPokemonList = async (
  query: PokemonQuery,
  signal?: AbortSignal,
): Promise<{ pokemon: PokemonListItem[]; total: number }> => {
    if (!query.type){
        const data: listResponse = await apiGet("/pokemon/", signal)
        const pokemon = (data.results.map((pokemon: PokemonListItem) => (
        { ...pokemon, id: idFromUrl(pokemon.url)})))
        const total = data.count
        
        return {  
            pokemon, total  
        }
    } else {
        const data: typeResponse = await apiGet(`/type/${query.type}`, signal)
        const pokemon = (data.pokemon.slice(0,24).map(({pokemon})=> (
            {...pokemon, id: idFromUrl(pokemon.url)}))) 
        const total = data.pokemon.length

        return {
            pokemon, total
        }
    }
};


export const getPokemon = (
  nameOrId: string | number,
  signal?: AbortSignal,
): Promise<Pokemon> => {
  return apiGet<Pokemon>(`/pokemon/${String(nameOrId)}`, signal)
};