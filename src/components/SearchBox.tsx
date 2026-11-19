interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
}

function SearchBox({value, onChange, onSearch}: SearchBoxProps) {

    function handleSubmit() {
        console.log("Submitting:", value)
        onSearch(value.trim())
    }

    function handleClear() {
        onChange("")
    }

    return(
        <>
            <label htmlFor="search-id">
                Find a Pokémon by name or number
            </label>
            <input 
            id="search-id"
            type="text"
            placeholder="search here"
            value={value}
            onChange={(event)=>onChange(event.target.value)}
            >
            </input>
            <button type="button" onClick={handleSubmit}>Find</button>
            {value.length >0 && (<button type="button" onClick={handleClear}>Clear</button>)}
        </>
    )
}

export default SearchBox