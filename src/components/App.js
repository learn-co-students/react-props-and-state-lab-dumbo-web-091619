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

  fetch1 = () => {
    if(this.state.filters.type === "all"){
      fetch(`/api/pets`)
      .then(r => r.json())
      .then(r => {
        this.setState({
          pets: []
        })
        r.forEach(el => {
          this.setState({
              pets: [...this.state.pets, el]
            })
          })
        })
    } else {
        fetch(`/api/pets?type=${this.state.filters.type}`)
        .then(r => r.json())
        .then(r => {
          this.setState({
            pets: []
          })
          r.forEach(el => {
            this.setState({
                pets: [...this.state.pets, el]
              })
            })
          })
      }
  }

  handleChangeType = (newType) => {
    // debugger
    this.setState({
      filters: {
        type: newType
      }
    })
  }

  handleFindPets = () => {
    this.fetch1()
  }

  handleAdopting = (id) => {
    this.state.pets.find(el => {
      return el.id == id
    }).isAdopted = true
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
              <Filters onFindPetsClick={this.handleFindPets} onChangeType={this.handleChangeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdopting}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
