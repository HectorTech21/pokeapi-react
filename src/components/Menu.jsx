import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

// Enlaces del menú: cada tipo usa la ruta con parámetro /tipo/:tipo
const enlaces = [
  { ruta: '/', texto: 'Kanto Dex' },
  { ruta: '/tipo/grass', texto: 'Planta' },
  { ruta: '/tipo/fire', texto: 'Fuego' },
  { ruta: '/tipo/water', texto: 'Agua' },
  { ruta: '/tipo/electric', texto: 'Eléc' },
  { ruta: '/tipo/psychic', texto: 'Psi' },
]

function Menu() {
  const [abierto, setAbierto] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const navigate = useNavigate()

  // La PokeAPI acepta número o nombre, así que vamos directos a /pokemon/:id
  function buscar(evento) {
    evento.preventDefault()
    const texto = busqueda.trim().toLowerCase().replace('#', '')
    if (texto === '') return
    navigate('/pokemon/' + texto)
    setBusqueda('')
    setAbierto(false)
  }

  return (
    <header className="cabecera">
      <div className="container-fluid">
        <div className="row bg-primary align-items-center">
          <div className="col-12 col-lg-3 logo-container d-flex align-items-center">
            <Link to="/">
              <img src="/logo.png" className="logo" alt="Sensor y luces de la Pokédex" />
              <div className="logo-texto">
                <span className="logo-titulo">POKÉDEX</span>
                <span className="logo-modelo">MODEL HANDY909</span>
              </div>
            </Link>
            <button
              type="button"
              className="navbar-toggler boton-menu d-lg-none ms-auto"
              aria-label="Abrir menú"
              onClick={() => setAbierto(!abierto)}
            >
              <i className="bi bi-list"></i>
            </button>
          </div>

          <div className="col-12 col-lg-6 navbar-container">
            <nav className="navbar navbar-expand-lg">
              <div className={abierto ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'}>
                <ul className="navbar-nav main-menu">
                  {enlaces.map((enlace) => (
                    <li className="nav-item" key={enlace.ruta}>
                      <NavLink className="nav-link" to={enlace.ruta} end onClick={() => setAbierto(false)}>
                        {enlace.texto}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          <div className={abierto ? 'col-12 col-lg-3 pb-3 pb-lg-0' : 'col-lg-3 d-none d-lg-block'}>
            <form onSubmit={buscar} className="input-group form-search-input-container">
              <button type="submit" className="input-group-text" aria-label="Buscar">
                <i className="bi bi-search"></i>
              </button>
              <input
                type="text"
                className="form-control"
                placeholder="Nº o nombre..."
                value={busqueda}
                onChange={(evento) => setBusqueda(evento.target.value)}
                aria-label="Número o nombre del Pokémon"
              />
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Menu
