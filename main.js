// Cards de cada comic

const loadComics = async () =>{
    const comicsResponse = await fetchComics();
    const data = comicsResponse.data;
    const comics = data.results;
    const containerCards = document.getElementById('containerCards');
    comics.forEach(comic => {
        const comicCard = document.createElement("div");
        const cardImg = document.createElement("img");
        const imgContainer = document.createElement("div");
        const cardTitle = document.createElement("h3");
        const cardTitleText= document.createTextNode(comic.title)

        comicCard.appendChild(imgContainer);
        containerCards.appendChild(comicCard);
        imgContainer.appendChild(cardImg);
        comicCard.appendChild(cardTitle);
        cardTitle.appendChild(cardTitleText);
        
        comicCard.classList.add("comicCard");
        imgContainer.classList.add("imgContainer");
        cardImg.classList.add("cardImg");
        cardTitle.classList.add("comicTitle")

        cardImg.setAttribute("src" , `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`)
    });

};
loadComics()

// Input orden

const searchForm = document.getElementById('searchForm')

searchForm.addEventListener('submit', e => {
    e.preventDefault()
    const params = new URLSearchParams(window.location.search);
    const orderBy = e.target['selectOrderComics'].value;

    params.set('orderBy', orderBy);
    
    window.location.href = window.location.pathname + '?' + params.toString()
    console.log(params.toString())
})
