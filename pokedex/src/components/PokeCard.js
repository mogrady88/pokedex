import React from 'react';
import './PokeCard.css';

const PokeCard = (props) => {
  if (!props.pokemon) return null;
  return (
    <div
      id="PokeCard"
      style={{ borderColor: props.pokemon.color.name }}
      key={props.idx}
      onClick={() => props.handleSelectPokemon(props.pokemon)}
    >
      <p className="card-title">{props.pokemon.name}</p>
      <img
        className="poke-img"
        alt="pokemon"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemon.id}.png`}
      />
      <p className="poke-num">No. {props.pokemon.order}</p>
    </div>
  );
};

export default PokeCard;
