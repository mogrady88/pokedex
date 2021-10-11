import React from 'react';
import './PokeCard.css';

const PokeCard = (props) => {
  if (!props.pokemon) return null;
  return (
    <div
      id="PokeCard"
      key={props.idx}
      onClick={() => props.handleSelectPokemon(props.pokemon)}
    >
      <p>{props.pokemon.name}</p>
      <img
        alt="pokemon"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemon.id}.png`}
      />
    </div>
  );
};

export default PokeCard;
