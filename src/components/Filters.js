import React from 'react'

class Filters extends React.Component {
  constructor(){
    super();
    this.state = {
      currentFilter: "all"
    }
  }

  handleChange = (e) => {
    this.setState(
      {
      currentFilter: e.target.value
      },
      this.props.onChangeType(e.target.value)
      )
  }

  handleClick = () => {
    this.props.onFindPetsClick(this.state.currentFilter)
  }


  render() {
    return (
      <div className="ui form">
        <h3>Animal type</h3>
        <div className="field">
          <select name="type" id="type" onChange={this.handleChange}>
            <option value="all">All</option>
            <option value="cat">Cats</option>
            <option value="dog">Dogs</option>
            <option value="micropig">Micropigs</option>
          </select>
        </div>

        <div className="field">
          <button className="ui secondary button" onClick={this.handleClick}>Find pets</button>
        </div>
      </div>
    )
  }
}

export default Filters
