const fetchCharacters = async (offset, orderBy) =>{
    const response = await fetch(`${baseUrl}/characters?apikey=${apiPublic}&offset=${offset}&orderBy=${orderBy}`)
    const data = await response.json()
    return data    
}
