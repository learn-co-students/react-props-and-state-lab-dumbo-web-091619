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

  changeFilter = (newFilterType) => {
    this.setState({
      ...this.state.pets,
      filters: {
        type: newFilterType
      }
    })
  }

  fetchPets = () => {
    let fetchEndpoint = "/api/pets"
    if (this.state.filters.type !== "all"){
      fetchEndpoint += `?type=${this.state.filters.type}`
    }
    fetch(fetchEndpoint)
    .then(r => r.json())
    .then(pets => {
      this.setState({
        pets: pets
      })
    })
}

  changeAdoptStatus = (petID) => {
    const pets = this.state.pets.map((pet) => {
      return pet.id === petID ? {...pet, isAdopted: true} : pet
    })
    this.setState({ pets: pets })
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
              <Filters onChangeType={this.changeFilter} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.changeAdoptStatus}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
