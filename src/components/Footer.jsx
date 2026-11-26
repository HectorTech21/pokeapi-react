import { TOTAL_KANTO } from '../utilidades.js'

function Footer() {
  return (
    <footer className="pie">
      <div className="container-fluid d-flex flex-wrap justify-content-between align-items-center gap-2">
        <p className="pie-estado">
          <span className="punto-verde"></span>
          <span className="pie-voz">DEX ONLINE</span>
          <span className="pie-separador">|</span>
          <span>KANTO INDEX: {TOTAL_KANTO} POKÉMON</span>
        </p>
        <p className="pie-marca">
          Datos de <a href="https://pokeapi.co" target="_blank" rel="noreferrer">pokeapi.co</a>
          <span className="pie-version">REACT VER 1.0</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
