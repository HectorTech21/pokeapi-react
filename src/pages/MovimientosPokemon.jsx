import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPokemonById } from '../pokeApi.js'
import { formatearNumero, nombreLegible } from '../utilidades.js'
import FichaMovimiento from '../components/FichaMovimiento.jsx'

// Movimientos de un Pokémon: /pokemon/:id/movimientos y /pokemon/:id/movimientos/:movimiento
function MovimientosPokemon() {
  const { id, movimiento } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function cargar() {
      setError(false)
      try {
        const datos = await getPokemonById(id)
        setPokemon(datos)
      } catch {
        setError(true)
      }
    }
    cargar()
  }, [id])

  if (error) {
    return <section className="carcasa"><p className="estado-peticion">No se encontró ningún Pokémon con "{id}".</p></section>
  }
  if (!pokemon) {
    return <section className="carcasa"><p className="estado-peticion">Cargando movimientos...</p></section>
  }

  // Ordenamos los movimientos por nombre
  const nombres = pokemon.moves.map((m) => m.move.name).sort()

  return (
    <section className="carcasa">
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <section className="panel">
            <section className="catalogo mt-0">
              <div className="catalogo-cabecera d-flex justify-content-between align-items-center">
                <h1 className="catalogo-titulo">
                  Movimientos de <Link to={'/pokemon/' + pokemon.id}>{formatearNumero(pokemon.id)} {pokemon.name}</Link>
                </h1>
                <span className="catalogo-contador">{nombres.length} movimientos</span>
              </div>
              <ul className="lista-movimientos">
                {nombres.map((nombre) => (
                  <li key={nombre}>
                    <Link
                      to={'/pokemon/' + pokemon.id + '/movimientos/' + nombre}
                      className={nombre === movimiento ? 'catalogo-fila activo' : 'catalogo-fila'}
                    >
                      <span className="catalogo-nombre">{nombreLegible(nombre)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </section>
        </div>

        <div className="col-12 col-lg-6">
          <section className="panel justify-content-start">
            {movimiento ? (
              <FichaMovimiento nombre={movimiento} />
            ) : (
              <p className="estado-peticion">Elige un movimiento de la lista para ver su ficha.</p>
            )}
          </section>
        </div>
      </div>
    </section>
  )
}

export default MovimientosPokemon
