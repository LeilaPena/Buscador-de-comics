const apiPublic = "ad190a0fc63213c3f3f9c4f4e562d713";
const baseUrl = "https://gateway.marvel.com/v1/public/";

const fetchComics = async (offset, orderBy) =>{
    const response = await fetch(`${baseUrl}/comics?apikey=${apiPublic}&offset=${offset}&orderBy=${orderBy}`)
    const data = await response.json()
    return data
}
