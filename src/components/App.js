import React, { useState, useEffect } from "react"
import Filters from "./Filters"
import PetBrowser from "./PetBrowser"

function App() {
  const [pets, setPets] = useState([])
  const [filters, setFilters] = useState({ type: "all" })
  const URL = "http://localhost:3001/pets"

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(pets => setPets(pets))
  }, [])

  function handleChangeType(type) {
    setFilters({ type: type })
  }

  function handleFindPetsClick() {
    let filteredURL = ""

    if (filters.type === "all") {
      filteredURL = URL
    } else {
      filteredURL = URL + `?type=${filters.type}`
    }
    fetch(filteredURL)
      .then(res => res.json())
      .then(filteredPets => setPets(filteredPets))
  }

  function handleAdoptPet(id) {
    const updatedPets = pets.map(pet =>
      pet.id === id ?{...pet, isAdopted: true} : pet
    )
    setPets(updatedPets)
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              onChangeType={handleChangeType}
              onFindPetsClick={handleFindPetsClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
