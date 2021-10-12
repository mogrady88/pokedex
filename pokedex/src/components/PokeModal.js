import React, { useEffect, useState } from 'react';
import './PokeModal.css';

async function getEvos(url) {
  const result = await fetch(url);
  return await result.json();
}

const PokeModal = (props) => {
  const [evolutionChain, setEvolutionChain] = useState([]);
  useEffect(() => {
    function getEvolutionParent(e) {
      setEvolutionChain((ary) => [...ary, e.species.name]);
      if (e.evolves_to.length === 0) return;
      getEvolutionParent(e.evolves_to[0]);
    }
    async function getEvolutions() {
      const result = await getEvos(props.selectedPokemon.evolution_chain.url);
      setEvolutionChain((ary) => [result.chain.species.name]);
      if (result.chain.evolves_to.length === 0) return;
      if (result.chain.evolves_to.length > 1) {
        //stupid eevee
        return;
      } else if (result.chain.evolves_to.length > 0) {
        getEvolutionParent(result.chain.evolves_to[0]);
      }
    }
    getEvolutions();
  }, []);
  console.log(props.selectedPokemon);

  const renderEvolvedFrom = () => {
    if (evolutionChain.length === 0) return null;
    return (
      <p>
        Evolutions: <br></br>
        <div>
          {evolutionChain.map((e, idx) => (
            <p
              key={idx}
              className="evolution-item"
              onClick={() => props.switchPokemon(e)}
            >
              {e}
            </p>
          ))}
        </div>
      </p>
    );
  };

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
          <p className="pokemon-name">{props.selectedPokemon.name}</p>
          <p className="pokemon-habitat">
            Found in: {props.selectedPokemon.habitat.name}
          </p>
          <p className="pokemon-description">
            Description:{' '}
            {props.selectedPokemon.flavor_text_entries[0].flavor_text}
          </p>
          {renderEvolvedFrom()}
        </div>
      </div>
    );
  };

  const renderModalHeader = () => {
    return (
      <div
        className="poke-modal-header"
        style={{ backgroundColor: `${props.selectedPokemon.color.name}` }}
      >
        <span className="close-icon" onClick={props.closeModal}>
          &times;
        </span>
      </div>
    );
  };

  return (
    <div id="PokeModal">
      <div
        className="poke-content"
        style={{
          border: `5px solid ${props.selectedPokemon.color.name}`,
          borderRadius: '5px',
        }}
      >
        {renderModalHeader()}
        {renderModalBody()}
      </div>
    </div>
  );
};

export default PokeModal;
