import { Routes, Route } from 'react-router-dom'

import Menu from './components/Menu.jsx'
import Footer from './components/Footer.jsx'
import Inicio from './pages/Inicio.jsx'
import PokemonPorTipo from './pages/PokemonPorTipo.jsx'
import DetallePokemon from './pages/DetallePokemon.jsx'
import MovimientosPokemon from './pages/MovimientosPokemon.jsx'
import NoEncontrado from './pages/NoEncontrado.jsx'

// Layout general: menú arriba, la página que toque en medio y footer abajo
function App() {
  return (
    <>
      <Menu />

      <main className="container-fluid contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/pagina/:numero" element={<Inicio />} />
          <Route path="/tipo/:tipo" element={<PokemonPorTipo />} />
          <Route path="/pokemon/:id" element={<DetallePokemon />} />
          <Route path="/pokemon/:id/movimientos" element={<MovimientosPokemon />} />
          <Route path="/pokemon/:id/movimientos/:movimiento" element={<MovimientosPokemon />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
