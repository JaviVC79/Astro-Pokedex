import React, { useState } from 'react';

const PokemonFetcher = () => {
    const [pokemonData, setPokemonData] = useState(null);
    const [error, setError] = useState(null);
    const [pokemonName, setPokemonName] = useState('');
    const [isClicked, setIsClicked] = useState(false);

    const getPokemonData = async (pokemonName) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            const data = await response.json();
            setPokemonData(data);
            setError(null);
        } catch (error) {
            setError(error.message);
            setPokemonData(null);
        }
    };

    const handleButtonClick = () => {
        if (!isClicked) {
            if (!pokemonName) {
                setError('Por favor, ingresa el nombre del Pokémon.');
                return;
            }
            getPokemonData(pokemonName);
        } else { setPokemonData(null); }
        setIsClicked(!isClicked);
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100">
            <label htmlFor="pokemonName" className="mb-2 text-lg font-medium text-gray-700">Pokémon Name:</label>
            <input
                className="mb-4 p-2 border border-gray-300 rounded-md text-black"
                type="text"
                id="pokemonName"
                value={pokemonName}
                onChange={(e) => setPokemonName(e.target.value)}
            />
            <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleButtonClick}
            >
                {isClicked ? 'Clear' : 'Buscar Pokémon'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {pokemonData && (
                <div className="mt-4 text-center">
                    <h3 className="text-2xl font-bold">{pokemonData.name}</h3>
                    <img
                        className="mx-auto mt-2"
                        src={pokemonData.sprites.front_default}
                        alt={pokemonData.name}
                    />
                </div>
            )}
        </div>
    );
};

export default PokemonFetcher;


