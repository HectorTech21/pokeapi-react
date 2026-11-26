// Funciones para consumir la PokeAPI (adaptadas de pokeApi/api.js de la Pokédex anterior)
const baseUrl = 'https://pokeapi.co/api/v2/'

async function consultar(ruta) {
  const respuesta = await fetch(baseUrl + ruta)
  if (!respuesta.ok) {
    throw new Error('La PokeAPI devolvió el error ' + respuesta.status)
  }
  return await respuesta.json()
}

export const getAllPokemons = (limite, desde) => consultar(`pokemon/?limit=${limite}&offset=${desde}`)
export const getPokemonById = (id) => consultar(`pokemon/${id}/`)
export const getPokemonSpecies = (id) => consultar(`pokemon-species/${id}/`)
export const getPokemonType = (nombre) => consultar(`type/${nombre}/`)
export const getPokemonMove = (nombre) => consultar(`move/${nombre}/`)
