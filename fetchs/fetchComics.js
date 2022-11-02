const apiPublic = "ad190a0fc63213c3f3f9c4f4e562d713";
const baseUrl = "https://gateway.marvel.com/v1/public/";

const fetchComics = async (page, orderBy, query) =>{
    const offset = (page - 1) * 20;
    let url = `${baseUrl}/comics?apikey=${apiPublic}&offset=${offset}`;
    if (orderBy) url += `&orderBy=${orderBy}`
    if (query) url += `&titleStartsWith=${query}`
    const response = await fetch(url)
    const data = await response.json();
    return data
}
