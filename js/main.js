// Elementos de HTML
const containerCards = document.getElementById('containerCards');
const containerComicDetails = document.getElementById('containerComicDetails');
const searchForm = document.getElementById('searchForm');
const contenedorPaginador = document.getElementById('contenedorPaginador');


// Cards de cada comic

const loadComics = async () =>{
    const params = new URLSearchParams(window.location.search);

    const comicsResponse = await fetchComics(0, params.get('orderBy') || 'title');
    const data = comicsResponse.data;
    const comics = data.results;


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


        comicCard.addEventListener('click', () =>{
            params.set('comicId', comic.id);

            window.location.href = window.location.pathname + '/../details.html?' + params.toString(); 

        });
    });

};

// Input orden

searchForm.addEventListener('submit', e => {
    e.preventDefault()
    const params = new URLSearchParams(window.location.search);
    const orderBy = e.target['selectOrderComics'].value;

    params.set('orderBy', orderBy);
    
    window.location.href = window.location.pathname + '?' + params.toString()
})

const initialize = () => {
    loadComics();
   };
window.onload = initialize;
   