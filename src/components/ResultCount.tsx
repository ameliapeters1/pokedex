interface ResultCountProps {
    count: number;
    label?: string
}


function ResultCount({count, label="pokemons"}: ResultCountProps){
    return(<p className="result-count">{ count } {label}</p>)  
}

export default ResultCount