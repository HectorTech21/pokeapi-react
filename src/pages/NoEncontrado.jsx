import { Link } from 'react-router-dom'

// Se muestra cuando la ruta no existe
function NoEncontrado() {
  return (
    <section className="carcasa">
      <section className="datos">
        <h1 className="datos-titulo">Error 404</h1>
        <p className="descripcion-texto my-3">Esta página no está en la Pokédex.</p>
        <Link to="/" className="boton-pildora">Volver a la Kanto Dex</Link>
      </section>
    </section>
  )
}

export default NoEncontrado
