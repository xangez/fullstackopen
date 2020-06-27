import React, {useState} from "react";

const Person = ({person}) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    {name: "Arto Hellas", number: "040-123456", id: 1},
    {name: "Ada Lovelace", number: "39-44-5323523", id: 2},
    {name: "Dan Abramov", number: "12-43-234345", id: 3},
    {name: "Mary Poppendieck", number: "39-23-6423122", id: 4},
  ]);
  const [newName, setName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [filterValue, setFilteredValue] = useState("");

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
      <div>
        Filter shown with
        <input onChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filterPersons().map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default App;
