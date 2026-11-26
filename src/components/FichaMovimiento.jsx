import { useState, useEffect } from 'react'
import { getPokemonMove } from '../pokeApi.js'
import { nombreLegible, textoEnEspanol } from '../utilidades.js'
import EtiquetaTipo from './EtiquetaTipo.jsx'

const categorias = { physical: 'Físico', special: 'Especial', status: 'Estado' }

// Ficha de un movimiento. Recibe el nombre del movimiento por props y pide sus datos
function FichaMovimiento({ nombre }) {
  const [movimiento, setMovimiento] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function cargar() {
      setMovimiento(null)
      setError(false)
      try {
        const datos = await getPokemonMove(nombre)
        setMovimiento(datos)
      } catch {
        setError(true)
      }
    }
    cargar()
  }, [nombre])

  if (error) return <p className="estado-peticion">No se pudo cargar el movimiento.</p>
  if (!movimiento) return <p className="estado-peticion">Consultando movimiento...</p>

  const titulo = textoEnEspanol(movimiento.names, 'name') || nombreLegible(movimiento.name)
  const descripcion = textoEnEspanol(movimiento.flavor_text_entries, 'flavor_text') || 'Sin descripción en español.'

  return (
    <article className="datos">
      <div className="datos-cabecera d-flex justify-content-between align-items-center gap-2">
        <h2 className="datos-titulo">{titulo}</h2>
        <EtiquetaTipo tipo={movimiento.type.name} />
      </div>

      <dl className="medidas movimiento-medidas">
        <div><dt>Categoría</dt><dd>{categorias[movimiento.damage_class.name]}</dd></div>
        <div><dt>Potencia</dt><dd>{movimiento.power ?? '—'}</dd></div>
        <div><dt>Precisión</dt><dd>{movimiento.accuracy == null ? '—' : movimiento.accuracy + ' %'}</dd></div>
        <div><dt>PP</dt><dd>{movimiento.pp ?? '—'}</dd></div>
        <div><dt>Prioridad</dt><dd>{movimiento.priority}</dd></div>
      </dl>

      <div className="descripcion">
        <p className="descripcion-titulo">Descripción</p>
        <p className="descripcion-texto">{descripcion}</p>
      </div>
    </article>
  )
}

export default FichaMovimiento
