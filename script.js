const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
};

const url = "https://pokeapi.co/api/v2/pokemon/"
const button = document.querySelector('#btn')
const card = document.querySelector('#card')

function setThemeColor(color) {
    card.style.background = `
    radial-gradient(circle at 50% 0%, ${color} 36%, #fff 36%)
    `
    card.querySelectorAll('.types span').forEach(type => {
        type.style.background = color
    })
}

function appendTypes(types) {
    
    console.log(types)
    types.forEach(type => {
        let span = document.createElement("span")
        span.textContent = type.type.name
        document.querySelector('.types').appendChild(span)
    })
    
}

function generateCard(data) {
        
    const hp = data.stats[0].base_stat
    const img = data.sprites.other.dream_world.front_default
    const pokemonName = `${data.name[0].toUpperCase()}${data.name.slice(1)}`
    const attack = data.stats[1].base_stat
    const defense = data.stats[2].base_stat
    const speed = data.stats[5].base_stat

    const themeColor = typeColor[data.types[0].type.name]

    card.innerHTML = `
        <p class="hp">
            <span>HP</span>
            ${hp}
        </p>
        <img src="${img}" alt="pokemon image">
        <h2 class="pokemon-name">${pokemonName}</h2>
        <div class="types">
            
        </div>
        <div class="stats">
            <div>
                <h3>${attack}</h3>
                <p>Attack</p>
            </div>
            <div>
                <h3>${defense}</h3>
                <p>Defense</p>
            </div>
            <div>
                <h3>${speed}</h3>
                <p>Speed</p>
            </div>
        </div>
    `
    appendTypes(data.types)
    setThemeColor(themeColor)

}

function getPokemonData() {

    const id = Math.ceil(Math.random() * 150)
    const fullURL = `${url}${id}`
    fetch(fullURL)
    .then(resp => resp.json())
    .then(data => generateCard(data))

}

button.addEventListener("click", getPokemonData)
window.addEventListener("load", getPokemonData)