import React from 'react';
import PokeCard from './PokeCard';
import './PokemonList.css';

const PokemonList = (props) => {
  if (!props.list) return null;

  const pokemon = props.list.map((e, idx) => (
    <PokeCard
      handleSelectPokemon={props.handleSelectPokemon}
      pokemon={e}
      key={idx}
    />
  ));

  return (
    <div id="PokeList">
      <input
        placeholder="Find your pokemon!"
        onChange={(e) => props.handleSearch(e)}
        value={props.searchFilter}
      />
      <div className="poke-list-container">{pokemon}</div>
    </div>
  );
};

export default PokemonList;
