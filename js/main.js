// Elementos de HTML
const containerCards = document.getElementById('containerCards');
const containerComicDetails = document.getElementById('containerComicDetails');
const searchForm = document.getElementById('searchForm');
const contenedorPaginador = document.getElementById('contenedorPaginador');
const contenedorOrdenPersonajes = document.getElementById('contenedorOrdenPersonajes');
const contenedorOrdenComics = document.getElementById('contenedorOrdenComics');
const selectTipo = document.getElementById('selectTipo');

// Cards de cada comic


const loadComics = async () =>{
    const params = new URLSearchParams(window.location.search);
    const page =  parseInt(params.get('page'))|| 1;
    const orderBy = params.get("orderBy") || 'title';
    const query = params.get('query');

    const comicsResponse = await fetchComics(page, orderBy, query);
    const data = comicsResponse.data;
    const comics = data.results;

    comics.forEach(comic => {
        const comicCard = document.createElement("div");
        const cardImg = document.createElement("img");
        const imgContainer = document.createElement("div");
        const cardTitle = document.createElement("h3");
        const cardTitleText= document.createTextNode(comic.title);

        comicCard.appendChild(imgContainer);
        containerCards.appendChild(comicCard);
        imgContainer.appendChild(cardImg);
        comicCard.appendChild(cardTitle);
        cardTitle.appendChild(cardTitleText);
        
        comicCard.classList.add("comicCard");
        imgContainer.classList.add("imgContainer");
        cardImg.classList.add("cardImg");
        cardTitle.classList.add("comicTitle");

        cardImg.setAttribute("src" , `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`)


        comicCard.addEventListener('click', () =>{
            params.set('comicId', comic.id);

            window.location.href = window.location.pathname + '/../views/details.html?' + params.toString(); 

        });
    });
    containerPagination(Math.ceil(data.total/20));
};

// Cards de cada comic

const loadCharacters = async () =>{
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page')) || 0;
    const orderBy = params.get("orderBy") || 'name';
    const query = params.get('query');

    const characterResponse = await fetchCharacters(page, orderBy,query);
    const data = characterResponse.data
    const characters = data.results

    characters.forEach(character =>{
        const characterCard = document.createElement("div");
        const characterImg = document.createElement("img");
        const imgContainer = document.createElement("div");
        const characterName = document.createElement("h3");
        const characterNameText = document.createTextNode(character.name);

        containerCards.appendChild(characterCard);
        characterCard.appendChild(imgContainer);
        characterCard.appendChild(characterName);
        imgContainer.appendChild(characterImg);
        characterName.appendChild(characterNameText);

        characterCard.classList.add("characterCard");
        imgContainer.classList.add("imgContainer");
        characterImg.classList.add("cardImg");
        characterName.classList.add("characterName");

        characterImg.setAttribute('src', `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`);

        characterCard.addEventListener('click', () =>{
            params.set('characterId', character.id);
            
            window.location.href = window.location.pathname + '/../views/characterDetails.html?' + params.toString(); 
        })
    })
    containerPagination(Math.ceil(data.total/20));
}

// Input orden

selectTipo.addEventListener('input', () =>{
    if (selectTipo.value === 'personajes'){
        contenedorOrdenComics.style.display= 'none';
        contenedorOrdenPersonajes.style.display='flex';
    }
    else{
        contenedorOrdenComics.style.display= 'flex';
        contenedorOrdenPersonajes.style.display='none';
    }
})

searchForm.addEventListener('submit', e => {
    e.preventDefault()
    const params = new URLSearchParams(window.location.search);
    const orderBy = () =>{
        if (contenedorOrdenComics.style.display !== 'none'){
            return e.target['selectOrderComics'].value;
        }
        else{
            return e.target['selectOrdenPersonajes'].value;
        }
    }    
    const orderType = selectTipo.value;
    const query = e.target['searchInput'].value;

    params.set('orderBy', orderBy());
    params.set('orderType', orderType);  
    params.set('page', 1);  
    params.set('query', query)


    window.location.href = window.location.pathname + '?' + params.toString()
})

const search = () =>{
    const params = new URLSearchParams(window.location.search)
    if (params.get('orderType')=== 'personajes'){
        loadCharacters()
    }
    else{
        loadComics()
    }
}

const initialize = () => {
    search()    
   };
window.onload = initialize;
   