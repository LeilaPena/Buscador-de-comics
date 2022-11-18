

const fetchComics = async (page, orderBy, query) =>{
    const offset = (page - 1) * 20;
    let url = `${baseUrl}/comics?apikey=${apiPublic}&offset=${offset}`;
    if (orderBy) url += `&orderBy=${orderBy}`
    if (query) url += `&titleStartsWith=${query}`
    const response = await fetch(url)
    const data = await response.json();
    return data
}
