import { Link, useParams } from 'react-router-dom'
import FichaResumida from '../components/FichaResumida.jsx'
import { TOTAL_KANTO } from '../utilidades.js'

const POR_PAGINA = 20

// Lista de los 151 de Kanto, por páginas: / y /pagina/:numero
function Inicio() {
  const { numero } = useParams()
  const totalPaginas = Math.ceil(TOTAL_KANTO / POR_PAGINA)
  const pagina = Number(numero) || 1

  // Los ids de Kanto van del 1 al 151, así que los calculamos sin pedir nada
  const ids = []
  const primero = (pagina - 1) * POR_PAGINA + 1
  for (let id = primero; id < primero + POR_PAGINA && id <= TOTAL_KANTO; id++) {
    ids.push(id)
  }

  const paginas = []
  for (let i = 1; i <= totalPaginas; i++) {
    paginas.push(i)
  }

  return (
    <section className="carcasa">
      <section className="catalogo mt-0">
        <div className="catalogo-cabecera d-flex justify-content-between align-items-center">
          <h1 className="catalogo-titulo">Catálogo regional (#001 - #151)</h1>
          <span className="catalogo-contador">Página {pagina} de {totalPaginas}</span>
        </div>

        {ids.length === 0 ? (
          <p className="estado-peticion">Esa página no existe.</p>
        ) : (
          <ul className="lista-pokemon">
            {ids.map((id) => (
              <li key={id}><FichaResumida id={id} /></li>
            ))}
          </ul>
        )}

        <nav className="paginacion" aria-label="Páginas">
          {paginas.map((p) => (
            <Link key={p} to={'/pagina/' + p} className={p === pagina ? 'boton-pildora activo' : 'boton-pildora'}>
              {p}
            </Link>
          ))}
        </nav>
      </section>
    </section>
  )
}

export default Inicio
