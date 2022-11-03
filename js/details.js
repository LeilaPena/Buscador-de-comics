const params = new URLSearchParams(window.location.search);

const containerComicDetails = document.getElementById('containerComicDetails');

const loadComic = async () => {

    const response = await fetch(`https://gateway.marvel.com/v1/public/comics/${params.get('comicId')}?apikey=ad190a0fc63213c3f3f9c4f4e562d713`);
    const data = await response.json()
    const comic = data.data.results[0];
    
    const contenedorDetalles = document.createElement('div')
    const comicImg = document.createElement('img');
    const containerText = document.createElement('div');
    const comicTitle = document.createElement('h2');
    const comicPublicado = document.createElement('h3');
    const comicPublicadoResultado = document.createElement('p');
    const comicGuionistas = document.createElement('h3');
    const comicGuionistasResultado = document.createElement('p');
    const comicDescripcion = document.createElement('h3');
    const comicDescripcionResultado = document.createElement('p');
    
    comicImg.setAttribute('src', `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`);
    
    contenedorDetalles.classList.add('contenedorDetalles');

    containerComicDetails.appendChild(contenedorDetalles)
    contenedorDetalles.appendChild(comicImg);
    contenedorDetalles.appendChild(containerText);
    containerText.appendChild(comicTitle);
    containerText.appendChild(comicPublicado);
    containerText.appendChild(comicPublicadoResultado);
    containerText.appendChild(comicGuionistas);
    containerText.appendChild(comicGuionistasResultado);
    containerText.appendChild(comicDescripcion);
    containerText.appendChild(comicDescripcionResultado); 

    
    const descripcionNull = () => {
        if (comic.description=== null){
            return ''
        }
        else {
            return comic.description
        }
    }
    
    comicTitle.appendChild(document.createTextNode(comic.title));
    comicPublicado.appendChild(document.createTextNode('Publicado:'));
    comicPublicadoResultado.appendChild(document.createTextNode(new Intl.DateTimeFormat('es-AR').format(new Date(comic.dates.find(date => date.type === 'onsaleDate').date))));
    comicGuionistas.appendChild(document.createTextNode('Guionistas:'));
    comicGuionistasResultado.appendChild(document.createTextNode(comic.creators.items.filter(item => item.role === 'writer').map(creator => creator.name).join(', ')));
    comicDescripcion.appendChild(document.createTextNode('Descripción:'));
    comicDescripcionResultado.appendChild(document.createTextNode(descripcionNull()))

    
    // Personajes incluidos

    const containerCharacters = document.createElement('div')
    containerComicDetails.appendChild(containerCharacters)
    containerCharacters.classList.add('containerCharacters')

    const response2 = await fetch(`https://gateway.marvel.com/v1/public/comics/${params.get('comicId')}/characters?apikey=ad190a0fc63213c3f3f9c4f4e562d713`);
    const data2 = await response2.json();
    const characters = data2.data.results;
    
    characters.forEach(character => {
        const characterCard = document.createElement('div');
        const imgContainer = document.createElement('div');
        const nameContainer = document.createElement('div');
        const characterImg = document.createElement('img');
        const characterName = document.createElement('h3');

        containerCharacters.appendChild(characterCard);
        characterCard.appendChild(imgContainer);
        characterCard.appendChild(nameContainer);
        imgContainer.appendChild(characterImg);
        nameContainer.appendChild(characterName);

        characterImg.setAttribute('src', `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`)
        characterName.appendChild(document.createTextNode(character.name))

        characterCard.classList.add("characterCard");
        imgContainer.classList.add("imgContainer");
        characterImg.classList.add("cardImg");
        characterName.classList.add("characterName");
        nameContainer.classList.add('nameContainer');

    })
}
loadComic()
