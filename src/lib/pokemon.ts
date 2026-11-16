export function idFromUrl(url: string): number {
    const words = url.split("/").filter(Boolean)
    const id = Number(words[words.length - 1]) 


    if (id <= 0 || Number.isNaN(id) ){
        throw new Error("it is not a valid number")
    }
    return id
}