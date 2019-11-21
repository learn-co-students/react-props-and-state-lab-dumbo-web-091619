import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  // GET fetch
  getPets = async () => {
    let petEndpoint = '/api/pets'

    if (this.state.filters.type !== 'all') {
      petEndpoint += `?type=${this.state.filters.type}`
    }

    let rawPets = await fetch(petEndpoint)
    let parsedPets = await rawPets.json()
    this.setState({pets: parsedPets})
    // test events & data filtering:
    console.log("parsedPets:")
    console.log(parsedPets)
    console.log("current state.pets:")
    console.log(this.state.pets)
    console.log("current this.state.filters.type:")
    console.log(this.state.filters.type)
  }

  // filter pet types event
  onChangeType = ({ target: { value } }) => {
    this.setState({
      filters: {...this.state.filters, type: value}
    })
  }

  // adopt pet event
  onAdoptPet = (petID) => {
    let pets = this.state.pets.map( pet => {
      return pet.id === petID ? {...pet, isAdopted: true } : pet
    })
    this.setState({
     pets: pets
    })
    
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.getPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
