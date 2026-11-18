import { POKEMON_TYPES } from "../lib/pokemon";

interface TypeSelectProps{
    value: string;
    onChange: (value:string)=> void;
}

function TypeSelect(props: TypeSelectProps){
    const {value, onChange} = props

    return(
        <>
        <label htmlFor="pokemon-type"> Pokemon type: </label>
          <select
          id={"pokemon-type"}
          value={value}
          onChange={(event)=>onChange(event.target.value)}>
            <option value="">All types</option>

            {POKEMON_TYPES.map((type)=>(
            <option key = {type} value={type}>
                {type}
            </option>))}
          </select>
        </>
    )

}

export default TypeSelect