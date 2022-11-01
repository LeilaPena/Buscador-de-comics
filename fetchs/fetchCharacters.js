const fetchCharacters = async (page, orderBy) =>{
    const response = await fetch(`${baseUrl}/characters?apikey=${apiPublic}&offset=${page}&orderBy=${orderBy}`)
    const data = await response.json()
    return data    
}
