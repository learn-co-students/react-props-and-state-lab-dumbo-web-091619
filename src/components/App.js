import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  update_type = ({ target: { value } }) => {
    this.setState({ filters: { ...this.state.filters, type: value } });
  }

  onFindPetsClick = () => {
    let api_str = '/api/pets'

    if (this.state.filters.type !== 'all') {
      api_str += `?type=${this.state.filters.type}`
    }

    fetch(api_str)
      .then(response => response.json())
      .then((response_object) => {
        this.setState({
          pets: response_object
        })
      })

  }

  onAdoptPet = (pet_id) => {
    const pets = this.state.pets.map((pet) => {
      return pet.id === pet_id ? {...pet, isAdopted: true} : pet
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
              <Filters onChangeType={this.update_type} onFindPetsClick={this.onFindPetsClick}/>
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

