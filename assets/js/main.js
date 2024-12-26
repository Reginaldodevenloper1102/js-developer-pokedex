const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function generatePokemonHTML(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="viewPokemonDetails(${JSON.stringify(pokemon)})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

// Redireciona para página de detalhes com os dados do Pokémon
function viewPokemonDetails(pokemon) {
    localStorage.setItem('selectedPokemon', JSON.stringify(pokemon));
    window.location.href = 'details.html';
}

// Função para redirecionar para a página de detalhes
function redirectToDetails() {
    // Exemplo: Defina qual Pokémon será mostrado na página de detalhes
    const selectedPokemon = {
        number: 19, // Número do Pokémon (substitua pelo selecionado)
        name: "Rattata", // Nome do Pokémon
        type: "normal", // Tipo
        photo: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png", // URL da imagem
        stats: {
            hp: 30,
            attack: 56,
            defense: 35,
            speed: 72,
        },
    };

    // Salva os detalhes do Pokémon no localStorage
    localStorage.setItem('selectedPokemon', JSON.stringify(selectedPokemon));

    // Redireciona para a página de detalhes
    window.location.href = 'details.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const pokemonData = JSON.parse(localStorage.getItem('selectedPokemon'));

    if (pokemonData) {
        document.getElementById('pokemonNumber').textContent = `#${pokemonData.number}`;
        document.getElementById('pokemonName').textContent = pokemonData.name;
        document.getElementById('pokemonType').textContent = pokemonData.type;
        document.getElementById('pokemonImage').src = pokemonData.photo;
        document.getElementById('pokemonStats').innerHTML = Object.entries(pokemonData.stats || {})
            .map(([key, value]) => `<li>${key.toUpperCase()}: ${value}</li>`)
            .join('');
    }
});


