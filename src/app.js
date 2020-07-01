import React, {useState, useEffect} from "react";
import Persons from "./components/personsDisplay";
import PersonForm from "./components/personForm";
import Filter from "./components/filter";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [filterValue, setFilteredValue] = useState("");

  useEffect(() => {
    personService.getAll().then((initalPeople) => {
      setPersons(initalPeople);
    });
  }, []);

  const clearInput = () => {
    setName("");
    setNumber("");
  };

  const updateNumber = () => {
    const person = persons.find((person) => person.name === newName);
    const changedPerson = {...person, number: newNumber};

    personService
      .update(person.id, changedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.name !== newName ? person : returnedPerson
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkPerson = () => {
    for (let person of persons) {
      if (person.name === newName) {
        let response = window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        );
        if (response) {
          updateNumber();
          return true;
        } else {
          return true;
        }
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

  const addPerson = (e) => {
    e.preventDefault();
    if (checkPerson()) {
      clearInput();
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };
    personService.createPerson(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      clearInput();
    });
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

  const handleDelete = (id) => {
    let result = window.confirm(`Delete ${id}?`);
    if (result) {
      personService.deletePerson(id);
      let newList = persons.filter((person) => person.id !== id);
      setPersons(newList);
    } else {
      return;
    }
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
      <Persons list={filterPersons()} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
