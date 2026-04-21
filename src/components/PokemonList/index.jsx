import "./PokemonList.css";

function PokemonList({ lista, filtro }) {
  const filtrados = lista.filter((poke) => {
    const nombre = poke.name.includes(filtro.toLowerCase());

    const tipo = poke.types.some((t) =>
      t.type.name.includes(filtro.toLowerCase())
    );

    return nombre || tipo;
  });

  return (
    <div className="grid">
      {filtrados.map((poke) => (
        <div className="mini-card" key={poke.id}>
          <img
            src={poke.sprites.front_default}
            alt={poke.name}
          />

          <p>{poke.name}</p>

          <small>
            {poke.types.map((t) => t.type.name).join(", ")}
          </small>
        </div>
      ))}
    </div>
  );
}

export default PokemonList;