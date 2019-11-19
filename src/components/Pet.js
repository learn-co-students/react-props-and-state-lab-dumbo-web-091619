import React from 'react'

class Pet extends React.Component {
  showGender (gender) {
    if (gender === 'male') {
      return '♂'
    }
    return '♀'
  }

  wantToAdopt = (event) => {
    const pet = this.props.pet
    this.props.onAdoptPet(pet.id)
  }

  isAdoptedButton (isAdopted) {
    if (isAdopted) {
      return <button className='ui disabled button'>Already adopted</button>
    }
    return <button className='ui primary button' onClick={this.wantToAdopt}>Adopt pet</button>
  }

  render () {
    return (
      <div className='card'>
        <div className='content'>
          <a className='header'>
            {/*'♀' OR '♂' */}
            {this.showGender(this.props.pet.gender)}
            {this.props.pet.name}
          </a>
          <div className='meta'>
            <span className='date'>{this.props.pet.type}</span>
          </div>
          <div className='description'>
            <p>Age: {this.props.pet.age}</p>
            <p>Weight: {this.props.pet.weight}</p>
          </div>
        </div>
        <div className='extra content'>
          {this.isAdoptedButton(this.props.pet.isAdopted)}
        </div>
      </div>
    )
  }
}

export default Pet
