import React from 'react';
import './PokeModal.css';

const PokeModal = (props) => {
  console.log(props.selectedPokemon);

  const renderModalBody = () => {
    return (
      <div className="poke-modal-body">
        <div className="img-container">
          <img
            className="poke-modal-img"
            alt="pokemon"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.selectedPokemon.id}.png`}
          />
        </div>
        <div className="info-container">
          <p>Name: {props.selectedPokemon.name}</p>
          <p>Color: {props.selectedPokemon.color.name}</p>
          <p>Found in: {props.selectedPokemon.habitat.name}</p>
        </div>
      </div>
    );
  };

  return (
    <div id="PokeModal">
      <div className="poke-content">
        <span className="close-icon" onClick={props.closeModal}>
          &times;
        </span>
        {renderModalBody()}
      </div>
    </div>
  );
};

export default PokeModal;
