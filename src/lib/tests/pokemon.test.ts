import { describe, test, expect, } from "vitest";

// import PokemonCard from "../components/PokemonCard/PokemonCard";
import {idFromUrl} from "../pokemon"

describe("id from URL", ()=> {
    test("a URL with a trailing slash", ()=>{
        expect(idFromUrl("https://pokeapi.co/api/v2/pokemon/25/")).toBe(25)
    })

    test("a URL without a trailing slash", ()=>{
        expect(idFromUrl("https://pokeapi.co/api/v2/pokemon/25")).toBe(25)
    })

    test("a URL that has no number", () => {
        expect(()=>{
            idFromUrl("http://pokeapi.co/api/v2/pokemon/")
        }).toThrow()
    })

})