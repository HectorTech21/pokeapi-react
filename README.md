# Pokédex Kanto en React

Pokédex hecha con React + Vite que consume la [PokeAPI](https://pokeapi.co).
El diseño y las funciones de la API vienen de mi Pokédex anterior (`pokedex_2026v2-main`).

## Cómo arrancarlo

```bash
npm install
npm run dev
```

Abre la dirección que muestra la terminal (normalmente http://localhost:5173).

## Rutas

| Ruta | Página |
| --- | --- |
| `/` y `/pagina/:numero` | Catálogo de Kanto, 20 Pokémon por página |
| `/tipo/:tipo` | Pokémon de Kanto de un tipo (ej. `/tipo/fire`) |
| `/pokemon/:id` | Ficha extensa (número o nombre, ej. `/pokemon/25` o `/pokemon/pikachu`) |
| `/pokemon/:id/movimientos` | Lista de movimientos del Pokémon |
| `/pokemon/:id/movimientos/:movimiento` | Lo mismo + la ficha del movimiento elegido |

## Estructura

```
src/
  main.jsx          Arranca React, el router y los estilos
  App.jsx           Layout (Menú + página + Footer) y las rutas
  pokeApi.js        Funciones fetch a la PokeAPI
  utilidades.js     Ayudas: formatear número, textos en español...
  index.css         Estilos de la Pokédex anterior
  components/
    Menu.jsx             Cabecera con logo, enlaces y buscador
    Footer.jsx           Pie de página
    FichaResumida.jsx    Número, nombre y tipo/s (prop: id)
    FichaExtensa.jsx     Todos los datos del Pokémon (props: pokemon, especie)
    FichaMovimiento.jsx  Datos de un movimiento (prop: nombre)
    EtiquetaTipo.jsx     Etiqueta de color de un tipo (prop: tipo)
    BarraEstadistica.jsx Barra de una estadística (props: nombre, valor)
  pages/
    Inicio.jsx              Catálogo paginado (param: numero)
    PokemonPorTipo.jsx      Filtro por tipo (param: tipo)
    DetallePokemon.jsx      Carga el Pokémon y muestra FichaExtensa (param: id)
    MovimientosPokemon.jsx  Lista de movimientos + FichaMovimiento (params: id, movimiento)
    NoEncontrado.jsx        Página 404
```

Librerías: `react-router-dom` para las rutas y `bootstrap` + `bootstrap-icons` para el diseño (igual que en la Pokédex anterior).
