// Pequeñas funciones de ayuda que usan varios componentes

export const TOTAL_KANTO = 151

// 7 -> "#007"
export function formatearNumero(numero) {
  return '#' + String(numero).padStart(3, '0')
}

// "solar-beam" -> "Solar beam"
export function nombreLegible(nombre) {
  return nombre.charAt(0).toUpperCase() + nombre.slice(1).replaceAll('-', ' ')
}

// Busca en una lista de la API el texto que está en español
export function textoEnEspanol(lista, campo) {
  const entrada = lista?.find((elemento) => elemento.language.name === 'es')
  return entrada ? entrada[campo].replace(/\s+/g, ' ') : ''
}

// Si nos pasamos de 1 o de 151, damos la vuelta
export function ajustarNumero(numero) {
  if (numero < 1) return numero + TOTAL_KANTO
  if (numero > TOTAL_KANTO) return numero - TOTAL_KANTO
  return numero
}

// Imagen pequeña de cada Pokémon (no hace falta pedirla a la API)
export function urlSprite(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

export const tiposEnEspanol = {
  normal: 'Normal', fire: 'Fuego', water: 'Agua', electric: 'Eléctrico',
  grass: 'Planta', ice: 'Hielo', fighting: 'Lucha', poison: 'Veneno',
  ground: 'Tierra', flying: 'Volador', psychic: 'Psíquico', bug: 'Bicho',
  rock: 'Roca', ghost: 'Fantasma', dragon: 'Dragón', dark: 'Siniestro',
  steel: 'Acero', fairy: 'Hada',
}

export const estadisticasEnEspanol = {
  hp: 'PS (HP)', attack: 'Ataque', defense: 'Defensa',
  'special-attack': 'At. especial', 'special-defense': 'Def. especial', speed: 'Velocidad',
}
