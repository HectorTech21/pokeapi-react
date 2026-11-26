import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPokemonById, getPokemonSpecies } from '../pokeApi.js'
import FichaExtensa from '../components/FichaExtensa.jsx'

// Página de un Pokémon: /pokemon/:id (id puede ser número o nombre)
function DetallePokemon() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [especie, setEspecie] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function cargar() {
      setCargando(true)
      setError(false)
      try {
        const datosPokemon = await getPokemonById(id)
        const datosEspecie = await getPokemonSpecies(datosPokemon.id)
        setPokemon(datosPokemon)
        setEspecie(datosEspecie)
      } catch {
        setError(true)
      }
      setCargando(false)
    }
    cargar()
  }, [id])

  return (
    <section className="carcasa">
      <div className="carcasa-superior d-flex justify-content-between align-items-center">
        {/* Las luces parpadean mientras se carga */}
        <div className={cargando ? 'indicadores cargando d-flex align-items-center gap-3' : 'indicadores d-flex align-items-center gap-3'}>
          <div className="sensor">
            <div className="sensor-lente"><span className="sensor-brillo"></span></div>
          </div>
          <div className="luces">
            <span className="luz luz-roja"></span>
            <span className="luz luz-amarilla"></span>
            <span className="luz luz-verde"></span>
          </div>
        </div>
        <div className="modelo text-end">
          <p className="modelo-nombre">KANTO OS • HANDY909</p>
          <p className="modelo-serie">REPLICATOR UNIT // DUAL-BUS ARCH</p>
        </div>
      </div>

      {cargando && !pokemon && <p className="estado-peticion">Consultando Pokémon {id}...</p>}
      {error && <p className="estado-peticion">No se encontró ningún Pokémon con "{id}".</p>}
      {pokemon && !error && <FichaExtensa pokemon={pokemon} especie={especie} />}
    </section>
  )
}

export default DetallePokemon
