import "@testing-library/jest-dom/vitest";
import { render, screen} from '@testing-library/react'
import PokemonCard from "./PokemonCard";


describe("Pokemon Card", () => {

    test("It shows name, number and image", ()=> {

    render(<PokemonCard id={1} name={"Bulbasaur"}/>)

    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("#001")).toBeInTheDocument();
    expect(screen.getByRole("img"));
  
    });
})

