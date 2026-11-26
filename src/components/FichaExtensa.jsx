import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatearNumero, nombreLegible, textoEnEspanol, ajustarNumero } from '../utilidades.js'
import EtiquetaTipo from './EtiquetaTipo.jsx'
import BarraEstadistica from './BarraEstadistica.jsx'

// Ficha extensa: todos los datos del Pokémon. Recibe por props el Pokémon y su especie
function FichaExtensa({ pokemon, especie }) {
  const [sonando, setSonando] = useState(false)

  const imagen = pokemon.sprites.other?.['official-artwork']?.front_default ?? pokemon.sprites.front_default
  const grito = pokemon.cries?.legacy ?? pokemon.cries?.latest
  const nombreEspecie = textoEnEspanol(especie?.genera, 'genus') || 'Especie sin registrar'
  const descripcion = textoEnEspanol(especie?.flavor_text_entries, 'flavor_text') || 'Descripción en español no disponible.'
  const habilidades = pokemon.abilities
    .map((h) => nombreLegible(h.ability.name) + (h.is_hidden ? ' (oculta)' : ''))
    .join(', ')

  const anterior = ajustarNumero(pokemon.id - 1)
  const siguiente = ajustarNumero(pokemon.id + 1)

  function reproducirGrito() {
    const audio = new Audio(grito)
    audio.onended = () => setSonando(false)
    setSonando(true)
    audio.play().catch(() => setSonando(false))
  }

  return (
    <div className="row g-4">
      {/* Pantalla verde con la imagen */}
      <div className="col-12 col-lg-6">
        <section className="panel">
          <div className="marco-pantalla">
            <div className="marco-superior d-flex justify-content-between align-items-center">
              <div className="d-flex gap-2">
                <span className="punto-rojo"></span>
                <span className="punto-rojo"></span>
              </div>
              <span className="marco-texto">SCAN-CAM MATRIX <span className="punto-verde"></span></span>
            </div>

            <div className="pantalla">
              <div className="pantalla-estado d-flex justify-content-between align-items-center">
                <p className="pantalla-id">ID: {formatearNumero(pokemon.id)} • {pokemon.name}</p>
                <span className="pantalla-modo">MODE: OPTIC-CAPTURE <i className="bi bi-broadcast"></i></span>
              </div>
              <figure className="pantalla-imagen">
                <img src={imagen} alt={pokemon.name} />
              </figure>
              <div className="pantalla-grito d-flex justify-content-between align-items-center">
                <button type="button" className="boton-grito" onClick={reproducirGrito} disabled={!grito}>
                  <i className="bi bi-soundwave"></i> Cry synth: <i className="bi bi-play-fill"></i>
                </button>
                <div className={sonando ? 'ondas sonando' : 'ondas'} aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Anterior / siguiente: enlaces con el id como parámetro */}
          <div className="row g-3 mt-1">
            <div className="col-6">
              <Link to={'/pokemon/' + anterior} className="boton-navegar">
                <i className="bi bi-arrow-left"></i> <span>{formatearNumero(anterior)}</span>
              </Link>
            </div>
            <div className="col-6">
              <Link to={'/pokemon/' + siguiente} className="boton-navegar">
                <span>{formatearNumero(siguiente)}</span> <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>

          <div className="consola d-flex justify-content-between align-items-center">
            <Link to={'/pokemon/' + pokemon.id + '/movimientos'} className="boton-pildora">
              <i className="bi bi-lightning-charge"></i> Ver movimientos
            </Link>
            <div className="d-flex gap-2" aria-hidden="true">
              <span className="balancin balancin-rojo"></span>
              <span className="balancin balancin-negro"></span>
            </div>
          </div>
        </section>
      </div>

      {/* Panel de datos */}
      <div className="col-12 col-lg-6">
        <section className="panel">
          <article className="datos">
            <div className="datos-cabecera d-flex justify-content-between align-items-center gap-2">
              <h1 className="datos-titulo">
                <span className="datos-numero">{formatearNumero(pokemon.id)}</span> {pokemon.name}
              </h1>
              <div className="d-flex gap-2">
                {pokemon.types.map((t) => <EtiquetaTipo key={t.type.name} tipo={t.type.name} />)}
              </div>
            </div>

            <dl className="medidas row gx-2">
              <div className="col-4">
                <dt>Especie</dt>
                <dd>{nombreEspecie}</dd>
              </div>
              <div className="col-4">
                <dt>Altura</dt>
                <dd>{(pokemon.height / 10).toFixed(1)} m</dd>
              </div>
              <div className="col-4">
                <dt>Peso</dt>
                <dd>{(pokemon.weight / 10).toFixed(1)} kg</dd>
              </div>
            </dl>

            <div className="descripcion">
              <p className="descripcion-titulo"><i className="bi bi-database"></i> Registro oficial Kanto:</p>
              <p className="descripcion-texto">{descripcion}</p>
            </div>

            <div className="descripcion">
              <p className="descripcion-titulo">Habilidades</p>
              <p className="descripcion-texto">{habilidades}</p>
            </div>

            <dl className="medidas row gx-2">
              <div className="col-4">
                <dt>Exp. base</dt>
                <dd>{pokemon.base_experience ?? '—'}</dd>
              </div>
              <div className="col-4">
                <dt>Movimientos</dt>
                <dd>{pokemon.moves.length}</dd>
              </div>
              <div className="col-4">
                <dt>Captura</dt>
                <dd>{especie?.capture_rate ?? '—'}</dd>
              </div>
            </dl>

            <ul className="estadisticas" aria-label="Estadísticas base">
              {pokemon.stats.map((s) => (
                <BarraEstadistica key={s.stat.name} nombre={s.stat.name} valor={s.base_stat} />
              ))}
            </ul>
          </article>
        </section>
      </div>
    </div>
  )
}

export default FichaExtensa
