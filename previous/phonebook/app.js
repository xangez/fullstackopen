import React, {useState, useEffect} from "react";
import Persons from "./components/personsDisplay";
import PersonForm from "./components/personForm";
import Filter from "./components/filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [filterValue, setFilteredValue] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  console.log("render", persons.length, "persons");

  const checkPerson = () => {
    for (let person of persons) {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`);
        return true;
      }
    }
  };

  const filterPersons = () => {
    if (filterValue === "") {
      return persons;
    }
    return persons.filter(
      (item) =>
        item.name.toLowerCase().startsWith(filterValue.toLowerCase()) === true
    );
  };

  const clearInput = () => {
    setName("");
    setNumber("");
  };

  const addPerson = (e) => {
    e.preventDefault();
    if (checkPerson()) {
      clearInput();
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    setPersons(persons.concat(personObject));
    clearInput();
  };

  const handleFilterChange = (e) => {
    setFilteredValue(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons list={filterPersons()} />
    </div>
  );
};

export default App;
