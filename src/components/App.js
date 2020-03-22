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

  changeFilters = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    }, () => console.log(this.state.filters.type))
  }

  fetchPets = () => {
    if (this.state.filters.type !== 'all') {
      fetch(`/api/pets?type=${this.state.filters.type}`).then(response => response.json()).then(response =>
        this.setState({
          pets: response
        })
      )
    }
    else {
      fetch("/api/pets").then(response => response.json()).then(response =>
        this.setState({
          pets: response
        })
      )
    }

    // .then((response) =>
    // //   this.setState({
    // //     pets: response
    // // })
  }

  onAdoptPet = (id) => {
    this.setState({
      pets: this.state.pets.map(pet => {
      if (pet.id === id) {
        return {...pet, isAdopted: true}
      }
      else {
        return pet
      }
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
              <Filters onChangeType={this.changeFilters} onFindPetsClick={this.fetchPets}/>
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
