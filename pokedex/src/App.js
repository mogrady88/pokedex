import { useEffect, useState } from 'react';
import './App.css';
import PokemonList from './components/PokemonList';

async function getAllPokemon(){
  const fullPokemonList = []
  const result = await fetch('https://pokeapi.co/api/v2/generation/1/')
  const pokeObjs = await result.json()
  pokeObjs.pokemon_species.forEach(async e => {
    const result = await fetch(e.url)
    const pokemon = await result.json()
    fullPokemonList.push(pokemon)
  })
  return fullPokemonList.sort((a,b) => a.order < b.order ? 1: -1 )
}

const App=()=> {
  const [fullPokeList, setFullPokeList] = useState(null)
  useEffect(()=> {
    const getPokemon = async()=>{
      const results = await getAllPokemon()
      setFullPokeList(results)
    }

    getPokemon()
  },[])


  const renderPokemonList = () => {
    // if(isProcessing) return null
      return <PokemonList list={fullPokeList} />
    }

  return (
    <div className="App">
      POKEDEX
      {renderPokemonList()}
    </div>
  );
}

export default App;
