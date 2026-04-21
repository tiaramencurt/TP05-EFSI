import "./PokemonCard.css";

function PokemonCard({ pokemon }) {
  return (
    <div className="card">
      <h2>{pokemon.name}</h2>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />

      <p>ID: {pokemon.id}</p>

      <p>
        Tipos:{" "}
        {pokemon.types.map((tipo) => tipo.type.name).join(", ")}
      </p>

      <p>Peso: {pokemon.weight}</p>
      <p>Altura: {pokemon.height}</p>
    </div>
  );
}

export default PokemonCard;