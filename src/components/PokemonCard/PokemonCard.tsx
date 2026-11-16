interface PokemonCardProps{
    id: number,
    name: string
}

function PokemonCard(props:PokemonCardProps){
    const {id, name} = props

    const formattedName = name.charAt(0).toUpperCase() + name.slice(1)
    const formattedId = `#${String(id).padStart(3, '0')}`;

    return(
       <li>
            <h2>{formattedName}</h2>
            <p>{formattedId}</p>
            <img 
            src = {`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt ={`Picture of ${formattedName}`}
            />
        </li>
    )
}

export default PokemonCard