import { useEffect, useState } from 'react';
import './App.css';
import PokeModal from './components/PokeModal';
import PokemonList from './components/PokemonList';

async function getAllPokemon() {
  const fullPokemonList = [];
  const result = await fetch('https://pokeapi.co/api/v2/generation/1/');
  const pokeObjs = await result.json();
  pokeObjs.pokemon_species.forEach(async (e) => {
    const result = await fetch(e.url);
    const pokemon = await result.json();
    fullPokemonList.push(pokemon);
  });
  return fullPokemonList;
}

const App = () => {
  const [fullPokeList, setFullPokeList] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState(fullPokeList);
  const [showModal, toggleShowModal] = useState(false);
  const [pokemon, selectPokemon] = useState(null);
  useEffect(() => {
    const getPokemon = async () => {
      const results = await getAllPokemon();
      let sortedResults = results.sort((a, b) => (a.order > b.order ? -1 : 1));
      setFullPokeList(sortedResults);
      setTimeout(() => setFilteredPokemon(sortedResults), 500);
    };

    getPokemon();
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchFilter(val);
    filterPokemon(val);
  };

  const handleSelectPokemon = (e) => {
    selectPokemon(e);
    if (!e) return;
    toggleShowModal(true);
  };

  const filterPokemon = (val) => {
    let tmpPokemon = fullPokeList.filter((e) =>
      e.name.toLowerCase().includes(val.toLowerCase())
    );
    setFilteredPokemon(tmpPokemon);
  };

  const closeModal = () => {
    toggleShowModal(false);
  };

  const renderPokemonList = () => {
    return (
      <div>
        <PokemonList
          list={filteredPokemon}
          handleSearch={handleSearch}
          searchValue={searchFilter}
          handleSelectPokemon={handleSelectPokemon}
        />
      </div>
    );
  };

  const renderPokeModal = () => {
    if (!showModal) return null;
    return (
      <div>
        <PokeModal selectedPokemon={pokemon} closeModal={closeModal} />
      </div>
    );
  };

  return (
    <div className="App">
      {renderPokemonList()}
      {renderPokeModal()}
    </div>
  );
};

export default App;
