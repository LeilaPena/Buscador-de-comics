const params = new URLSearchParams(window.location.search);

const containerCharacterDetails = document.getElementById('containerCharacterDetails');

const loadCharacter = async () => {

    const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${params.get('characterId')}?apikey=ad190a0fc63213c3f3f9c4f4e562d713`);
    const data = await response.json()
    const character = data.data.results[0];

    const contenedorDetalles = document.createElement('div')
    const characterImg = document.createElement('img');
    const containerText = document.createElement('div');
    const characterName = document.createElement('h2');
    const characterDescripcion = document.createElement('p');

    
    characterImg.setAttribute('src', `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`);

    contenedorDetalles.classList.add('contenedorDetalles');

    containerCharacterDetails.appendChild(contenedorDetalles)
    contenedorDetalles.appendChild(characterImg);
    contenedorDetalles.appendChild(containerText);
    containerText.appendChild(characterName);
    containerText.appendChild(characterDescripcion);


    const descripcionNull = () => {
        if (character.description=== null){
            return ''
        }
        else {
            return character.description
        }
    }

    characterName.appendChild(document.createTextNode(character.name))
    characterDescripcion.appendChild(document.createTextNode(descripcionNull()))

    // Comics en donde estan incluidos
    const containerComics = document.createElement('div');
    containerCharacterDetails.appendChild(containerComics);
    containerComics.classList.add('containerComics');

    const response2= await fetch(`https://gateway.marvel.com/v1/public/characters/${params.get('characterId')}/comics?apikey=ad190a0fc63213c3f3f9c4f4e562d713`);
    const data2 = await response2.json();
    const comics = data2.data.results;

    comics.forEach(comic =>{
        const comicCard = document.createElement("div");
        const cardImg = document.createElement("img");
        const imgContainer = document.createElement("div");
        const cardTitle = document.createElement("h3");
        const cardTitleText= document.createTextNode(comic.title);

        comicCard.appendChild(imgContainer);
        containerComics.appendChild(comicCard);
        imgContainer.appendChild(cardImg);
        comicCard.appendChild(cardTitle);
        cardTitle.appendChild(cardTitleText);
        
        comicCard.classList.add("comicCard");
        imgContainer.classList.add("imgContainer");
        cardImg.classList.add("cardImg");
        cardTitle.classList.add("comicTitle");

        cardImg.setAttribute("src" , `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`) 
    })
}
loadCharacter()
