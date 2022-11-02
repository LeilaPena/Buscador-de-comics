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


}
loadCharacter()
