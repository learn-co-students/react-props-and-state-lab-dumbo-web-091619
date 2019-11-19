import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
 
  genPets = (pets) => pets.map((pet) => this.genPet(pet))
  
  genPet = (pet) => <Pet pet={pet} onAdoptPet={this.props.onAdoptPet} />

  render () {
    return <div className="ui cards">{this.genPets(this.props.pets)}</div>
  }
}

export default PetBrowser
