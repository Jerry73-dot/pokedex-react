import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchPokemon = async () => {
    if (!search.trim()) return;

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase().trim()}`
      );

      setPokemonData(res.data);
    } catch (error) {
      console.error(error);
      setPokemonData(null);
      setError("Pokemon not found. Try another name.");
    } finally {
      setLoading(false);
    }
  };

  const randomPokemon = async () => {
    try {
      setLoading(true);
      setError("");

      const randomId = Math.floor(Math.random() * 1025) + 1;

      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );

      setPokemonData(res.data);
      setSearch(res.data.name);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchPokemon();
    }
  };

  return (
    <div className="app">

      <header className="navbar">
        <div className="logo">
          <div className="pokeball-logo">
            <span></span>
          </div>
          <h2>Poke<span>Dex</span></h2>
        </div>

        <nav>
          <button className="nav-btn active">INFO</button>
        </nav>
      </header>

      <main className="hero">

        <div className="hero-text">
          <p className="eyebrow">WELCOME TO THE</p>

          <h1>
            Ultimate
            <span> Pokedex</span>
          </h1>

          <p className="description">
            Search through the world of Pokémon and discover
            their stats, abilities, types, and more.
          </p>
        </div>

        <div className="search-card">

          <label htmlFor="pokemon-search">
            Search Pokemon
          </label>

          <div className="search-container">

            <div className="input-wrapper">
              <span className="search-icon">⌕</span>

              <input
                id="pokemon-search"
                type="text"
                placeholder="pikachu"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <button
              className="search-btn"
              onClick={searchPokemon}
            >
              Search
            </button>

            <button
              className="random-btn"
              onClick={randomPokemon}
            >
              ⚄ Random
            </button>

          </div>

          {error && (
            <p className="error-message">{error}</p>
          )}

        </div>
      </main>

      <section className="pokemon-section">

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Searching the Pokedex...</p>
          </div>
        )}

        {!loading && pokemonData && (
          <article className="pokemon-card">

            <div className="pokemon-image-area">

              <div className="pokemon-number">
                #{String(pokemonData.id).padStart(3, "0")}
              </div>

              <img
                src={
                  pokemonData.sprites.other?.["official-artwork"]
                    ?.front_default ||
                  pokemonData.sprites.front_default
                }
                alt={pokemonData.name}
              />

            </div>

            <div className="pokemon-info">

              <p className="pokemon-label">
                POKEMON
              </p>

              <h2>
                {pokemonData.name}
              </h2>

              <div className="types">

                {pokemonData.types.map((typeInfo) => (
                  <span
                    key={typeInfo.type.name}
                    className={`type ${typeInfo.type.name}`}
                  >
                    {typeInfo.type.name}
                  </span>
                ))}

              </div>

              <div className="pokemon-details">

                <div className="detail">
                  <span>HEIGHT</span>
                  <strong>
                    {pokemonData.height / 10} m
                  </strong>
                </div>

                <div className="detail">
                  <span>WEIGHT</span>
                  <strong>
                    {pokemonData.weight / 10} kg
                  </strong>
                </div>

                <div className="detail">
                  <span>BASE EXP</span>
                  <strong>
                    {pokemonData.base_experience}
                  </strong>
                </div>

              </div>

              <div className="abilities">

                <h3>Abilities</h3>

                <div className="ability-list">

                  {pokemonData.abilities.map((abilityInfo) => (
                    <span key={abilityInfo.ability.name}>
                      {abilityInfo.ability.name.replace("-", " ")}
                    </span>
                  ))}

                </div>

              </div>

            </div>

          </article>
        )}

        {!loading && !pokemonData && !error && (
          <div className="empty-state">

            <div className="empty-pokeball">
              <span></span>
            </div>

            <h2>Discover a Pokemon</h2>

            <p>
              Search for a Pokemon above or use the Random button
              to begin exploring.
            </p>

          </div>
        )}

      </section>

      <footer>
        <p>
          PokeDex • Powered by <strong>PokeAPI</strong>
        </p>
      </footer>

    </div>
  );
}
export default App;