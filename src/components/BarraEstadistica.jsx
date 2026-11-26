import { estadisticasEnEspanol } from '../utilidades.js'

// Una fila de estadística con su barra de 12 segmentos (el máximo de la API es 255)
function BarraEstadistica({ nombre, valor }) {
  const llenos = Math.round((valor / 255) * 12)
  const segmentos = []
  for (let i = 0; i < 12; i++) {
    segmentos.push(<span key={i} className={i < llenos ? 'segmento lleno' : 'segmento'}></span>)
  }

  return (
    <li className="estadistica">
      <span className="estadistica-nombre">{estadisticasEnEspanol[nombre] ?? nombre}</span>
      <span className="barra">{segmentos}</span>
      <span className="estadistica-valor">{valor}</span>
    </li>
  )
}

export default BarraEstadistica
