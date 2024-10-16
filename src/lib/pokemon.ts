
export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export const getPokemonData = async (limit?: number, offset?: number): Promise<PokemonResponse> => {
  if (limit === undefined) {
    limit = 60;
  }
  if (offset === undefined) {
    offset = 0;
  }
  const baseUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  try {
    const response = await fetch(`${baseUrl}`);
    if (!response.ok) {
      throw new Error("Pokémon no encontrado");
    }
    const data: PokemonResponse = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.error("Error al obtener los datos del Pokémon:", error);
    throw error;
  }
};

export const getPokemon = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Pokémon no encontrado");
    }
    const data: any = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.error("Error al obtener los datos del Pokémon:", error);
    throw error;
  }
};

export const getPokemonMoves = async (): Promise<any> => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/move?limit=1000");
    if (!response.ok) {
      throw new Error("Pokémon no encontrado");
    }
    const data: any = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.error("Error al obtener los datos del Pokémon:", error);
    throw error;
  }
};

export function getLastPathUrl(url: string) {
  const segmentos = url.split('/');
  return segmentos.filter(segmento => segmento !== '').pop();
}
export async function getPokemonsDetails(limit?: number, offset?: number) {
  const data = await getPokemonData(limit, offset);
  let pokemonsData = data.results;
  const urls = pokemonsData.map((pokemon: any) => {
    return pokemon.url;
  });
  const pokemons: any[] = [];
  let validatedPokemons: string[] = [];
  if (!urls || urls.length === 0) {
    return null;
  }
  try {
    await Promise.all(
      urls.map(async (url: any) => {
        const response = await fetch(url);
        const data = await response.json();
        pokemons.push(data);
        validatedPokemons = pokemons.filter(
          (element: any) => element != null,
        );
      }),
    );
    return validatedPokemons;
  } catch (error) {
    return null;
  }
}

export async function getPokemonTypes(){
  try {
    const response = await fetch("https://pokeapi.co/api/v2/type");
    if (!response.ok) {
      throw new Error("Pokémon no encontrado");
    }
    const data: any = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.error("Error al obtener los datos del Pokémon:", error);
    throw error;
  }
}

export async function getPokemonsByTypes(type: string){
  const urls = await fetch(`https://pokeapi.co/api/v2/type/${type}`).then(res => res.json()).then(data => data.pokemon.map((pokemon: any) => pokemon.pokemon.url))  ;
  //console.log(urls)
  const pokemons: any[] = [];
  let validatedPokemons: string[] = [];
  try {
    await Promise.all(
      urls.map(async (url: any) => {
        const response = await fetch(url);
        const data = await response.json();
        pokemons.push(data);
        validatedPokemons = pokemons.filter(
          (element: any) => element != null,
        );
      }),
    );
    //console.log(validatedPokemons.map((item:any)=>item.name))
    return validatedPokemons;
  } catch (error) {
    return null;
  }
};