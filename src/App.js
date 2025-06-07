import { useEffect, useState } from 'react';
import './App.css';
import PropTypes from 'prop-types';

const PokemonRow = ( {pokemon , onSelect} ) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(', ')}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}>Select!</button>
    </td>
  </tr>
)

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
}

const PokemonInfo = ( {name, base} ) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      <tbody>
        {Object.keys(base).map((key) => ( 
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }).isRequired,
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    'Sp. Attack': PropTypes.number.isRequired,
    'Sp. Defense': PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }).isRequired,
}


function App() {
  const [filter, filterSet] = useState("");
  const [selectedItem, selectedItemSet] = useState(null);
  const [pokemons, pokemonsSet] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/metaslim/pokemon.json/master/pokedex.json')
    .then(res => res.json())
    .then(data => pokemonsSet(data));
  }, []);

  return (
    <div
    style={{
      margin: "auto",
      width: 800,
      paddingTop: "1rem",
    }}>
      <h1 className="title">Pokemon Search</h1>
      <input type="text" placeholder="Search" value={filter} onChange={(e) => filterSet(e.target.value)} />
      <div styke = {{
        display: 'grid',
        gridTemplateColumns: '70% 30%',
        gridColumnGap: '1rem',
      }}>
        <div>
          <table width="100%">
            <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
            </thead>
            <tbody>
              {
                pokemons
                .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
                .slice(0, 20)
                .map((pokemon) => (
                  <PokemonRow pokemon={pokemon} key={pokemon.id} onSelect={(pokemon) => selectedItemSet(pokemon)}></PokemonRow>
                ))
              }
            </tbody>
          </table>
        </div>
        {selectedItem && <PokemonInfo {...selectedItem} />}
      </div>
    </div>
  );
}

export default App;
