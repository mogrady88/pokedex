import React from 'react'
import PokeCard from './PokeCard'

const PokemonList = (props) => {
    const renderPokemonList = () => {
        if(!props.list) return null
             return props.list.map((e,idx) => <PokeCard pokemon={e} idx={idx}/>)
            
    }
    return(
        <div>
        <div>Pokemon List</div>
        <div>
            {renderPokemonList()}
        </div>
        </div>
    )
}

export default PokemonList