interface ResultCountProps {
    count: number;
    total: number;
    label?: string
}


function ResultCount({count, total, label="pokemons"}: ResultCountProps){
    return(
    <p className="result-count">
        Showing { count } of {total} {label}
    </p>)  
}

export default ResultCount