import "./Buscador.css";

function Buscador({ texto, setTexto, buscarPokemon }) {
  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Nombre o ID"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <button onClick={buscarPokemon}>Buscar</button>
    </div>
  );
}

export default Buscador;