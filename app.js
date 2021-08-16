
const geturl= id => 'https://rickandmortyapi.com/api/character/${id}'

const generateCharacterPromises = () => Array(150).fill().map((_,index)=>
    fetch(geturl(index + 1)).then(response => response.json())
)

const generateHTML = characters => {characters.reduce((accumulator, {id, name, status, species, origin}) => {
    const elementsOrigin=origin.map(originInfo=>originInfo.origin.name)

    accumulator+='
        <li class="card ${elementsOrigin[0]}">
        <img class="card-img" alt='${name}' src='https://rickandmortyapi.com/api/character/avatar/${character.id}.jpg' />
            <h2 class="card-title">${id}. ${name}</h2>
            <p class='card-subtitle'>${status}</p>
            <p class='card-subtitle'>${species}</p>
            <p class="card-subtitle">${elementsOrigin.join(' | ')}</p>
        </li>'
    return accumulator
}, ' ')

const insertCharactersIntoPage = characters => {
    const ul = document.querySelector('[data-js="rickAndmorty"]')
            ul.innerHTML=characters
}


const characterPromises = generateCharacterPromises()

Promises.all(characterPromises)
    .then(generateHTML)
    .then(insertCharactersIntoPage)