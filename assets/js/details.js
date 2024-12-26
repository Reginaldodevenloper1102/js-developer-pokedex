document.addEventListener('DOMContentLoaded', () => {
    const pokemonNumber = document.getElementById('pokemonNumber');
    const pokemonName = document.getElementById('pokemonName');
    const pokemonType = document.getElementById('pokemonType');
    const pokemonImage = document.getElementById('pokemonImage');
    const pokemonDescription = document.getElementById('pokemonDescription');
    const pokemonStats = document.getElementById('pokemonStats');

    // Obter dados do localStorage
    const pokemonData = JSON.parse(localStorage.getItem('selectedPokemon'));

    if (pokemonData) {
        pokemonNumber.textContent = `#${pokemonData.number}`;
        pokemonName.textContent = pokemonData.name;
        pokemonType.textContent = pokemonData.type;
        pokemonType.style.backgroundColor = getTypeColor(pokemonData.type);
        pokemonImage.src = pokemonData.photo;
        pokemonDescription.textContent = `This is a placeholder description for ${pokemonData.name}.`; // Customize ou adicione descrição real.

        // Adiciona as estatísticas
        const statsHtml = Object.entries(pokemonData.stats || {}).map(
            ([key, value]) => `<li>${key.toUpperCase()}: ${value}</li>`
        ).join('');
        pokemonStats.innerHTML = statsHtml;
    }

    // Define cores baseadas no tipo do Pokémon
    function getTypeColor(type) {
        const colors = {
            fire: '#F08030',
            water: '#6890F0',
            grass: '#78C850',
            electric: '#F8D030',
            // Adicione outros tipos
        };
        return colors[type] || '#A8A878'; // Default
    }
});
