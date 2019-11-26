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



findPets = () => {
   let url = '/api/pets'
     if(this.state.filters.type !== 'all'){
       url = `${url}?type=${this.state.filters.type}`
     }
 fetch(url)
   .then(response => response.json())
   .then(data => this.setState({
     pets: data
   })
 )
}

onChangeType = (event) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: event.target.value
      }
   })
 }

onAdoptPet = (id) => {
  //if id === pet.id => pet.isAdopted = true
  this.setState({
    pets: this.state.pets.map((pet) => {
      if (pet.id === id){
        pet.isAdopted = true
      }
      return pet
    })
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
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.findPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default App
