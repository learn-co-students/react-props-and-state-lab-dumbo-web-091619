import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  generatePets = () => {
    return this.props.pets.map((el) => <div className="ui cards"><Pet pet={el} key={el.id}/></div>)
  }
  render() {
    return this.generatePets()
  }
}

export default PetBrowser
