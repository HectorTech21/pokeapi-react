import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPokemonById } from '../pokeApi.js'
import { formatearNumero, urlSprite } from '../utilidades.js'
import EtiquetaTipo from './EtiquetaTipo.jsx'

// Ficha resumida: número, nombre y tipo/s. Recibe el id por props
function FichaResumida({ id }) {
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    async function cargar() {
      try {
        const datos = await getPokemonById(id)
        setPokemon(datos)
      } catch {
        setPokemon(null)
      }
    }
    cargar()
  }, [id])

  return (
    <Link to={'/pokemon/' + id} className="ficha-resumida">
      <img src={urlSprite(id)} alt={pokemon ? pokemon.name : 'Pokémon ' + id} loading="lazy" />
      <span className="catalogo-numero">{formatearNumero(id)}</span>
      <span className="catalogo-nombre">{pokemon ? pokemon.name : 'Cargando...'}</span>
      <div className="d-flex gap-2">
        {pokemon && pokemon.types.map((t) => <EtiquetaTipo key={t.type.name} tipo={t.type.name} />)}
      </div>
    </Link>
  )
}

export default FichaResumida
