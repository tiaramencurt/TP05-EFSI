import { useEffect, useState } from "react";
import "./App.css";

import Buscador from "./components/Buscador";
import PokemonCard from "./components/PokemonCard";
import PokemonList from "./components/PokemonList";
import Loading from "./components/Loading";

function App() {
  const [texto, setTexto] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filtro, setFiltro] = useState("");

  const url = "https://pokeapi.co/api/v2/pokemon/";

  useEffect(() => {
    cargarLista();
  }, []);
  
  async function cargarLista() {
    setLoading(true);

    try {
      const res = await fetch(url + "?limit=30");
      const data = await res.json();

      const detalles = await Promise.all(
        data.results.map(async (poke) => {
          const r = await fetch(poke.url);
          return await r.json();
        })
      );

      setLista(detalles);
    } catch {
      setError("Error al cargar lista");
    }

    setLoading(false);
  }

  async function buscarPokemon() {
    if (texto.trim() === "") {
      setError("Ingrese nombre o ID");
      return;
    }

    setLoading(true);
    setError("");
    setPokemon(null);

    try {
      const res = await fetch(url + texto.toLowerCase());

      if (!res.ok) throw new Error();

      const data = await res.json();

      setPokemon(data);
    } catch {
      setError("Pokémon no encontrado");
    }

    setLoading(false);
  }

  return (
    <div className="contenedor">
      <h1>Mini Pokédex</h1>

      <Buscador
        texto={texto}
        setTexto={setTexto}
        buscarPokemon={buscarPokemon}
      />

      {loading && <Loading />}

      {error && <p className="error">{error}</p>}

      {pokemon && <PokemonCard pokemon={pokemon} />}

      <hr />

      <h2>Lista de Pokémon</h2>

      <input
        className="filtro"
        type="text"
        placeholder="Filtrar por nombre o tipo"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <PokemonList lista={lista} filtro={filtro} />
    </div>
  );
}

export default App;