import React from 'react'
import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  state = {
    pets: [],
    filters: {
      type: 'all'
    }
  }

  updatePets = (pets) => {
    this.setState({
      pets
    })
  }

  updateFilters = (filter) => {
    this.setState({
      filters: {
        type: filter
      }
    })
  }

  onFindPetsClick = () => {
    fetch(this.getUrl(this.state.filters.type)) //eslint-disable-line
      .then(response => response.json())
      .then((pets) => this.updatePets(pets))
  }

  getUrl (type) {
    if (type === 'all' || type === undefined){
      return '/api/pets'
    }
    return `/api/pets?type=${type}`
  }

  onAdoptPet = (id) => {
    for (const pet of this.state.pets) {
      if (pet.id === id){
        pet.isAdopted = true
      }
      // this.updatePets(this.state.pets)
      // break
    }
  }


  render () {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.updateFilters} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
