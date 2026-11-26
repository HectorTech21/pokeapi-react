import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPokemonType } from '../pokeApi.js'
import { TOTAL_KANTO, tiposEnEspanol } from '../utilidades.js'
import FichaResumida from '../components/FichaResumida.jsx'

// Pokémon de Kanto de un tipo: /tipo/:tipo
function PokemonPorTipo() {
  const { tipo } = useParams()
  const [ids, setIds] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function cargar() {
      setCargando(true)
      setError(false)
      try {
        const datos = await getPokemonType(tipo)
        // La URL acaba en /pokemon/25/ -> sacamos el número y nos quedamos con los de Kanto
        const numeros = datos.pokemon
          .map((p) => Number(p.pokemon.url.split('/').at(-2)))
          .filter((id) => id <= TOTAL_KANTO)
        setIds(numeros)
      } catch {
        setError(true)
      }
      setCargando(false)
    }
    cargar()
  }, [tipo])

  return (
    <section className="carcasa">
      <section className="catalogo mt-0">
        <div className="catalogo-cabecera d-flex justify-content-between align-items-center">
          <h1 className="catalogo-titulo">Tipo {tiposEnEspanol[tipo] ?? tipo}</h1>
          <span className="catalogo-contador">{ids.length} especímenes</span>
        </div>

        {cargando && <p className="estado-peticion">Consultando tipo...</p>}
        {error && <p className="estado-peticion">No se pudo cargar el tipo "{tipo}".</p>}

        {!cargando && !error && (
          <ul className="lista-pokemon">
            {ids.map((id) => (
              <li key={id}><FichaResumida id={id} /></li>
            ))}
          </ul>
        )}
      </section>
    </section>
  )
}

export default PokemonPorTipo
