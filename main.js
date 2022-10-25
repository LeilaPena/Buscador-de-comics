const loadComics = async () =>{
    const comicsResponse = await fetchComics();
    const data = comicsResponse.data;
    const comics = data.results;
}
loadComics()