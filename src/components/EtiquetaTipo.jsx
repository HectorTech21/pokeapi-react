import { tiposEnEspanol } from '../utilidades.js'

// Recibe el nombre del tipo en inglés (ej: "fire") y pinta la etiqueta de color
function EtiquetaTipo({ tipo }) {
  return <span className={'tipo tipo-' + tipo}>{tiposEnEspanol[tipo] ?? tipo}</span>
}

export default EtiquetaTipo
