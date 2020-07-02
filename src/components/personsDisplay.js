import React from "react";

const Person = ({person, handleDelete}) => {
  return (
    <li className="personNumber">
      {person.name} {person.number}
      <button onClick={handleDelete}>delete</button>
    </li>
  );
};

const Persons = ({list, handleDelete}) => {
  return (
    <ul>
      {list.map((person, index) => (
        <Person
          key={index}
          person={person}
          handleDelete={() => handleDelete(person.id, person.name)}
        />
      ))}
    </ul>
  );
};

export default Persons;
