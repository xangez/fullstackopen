import React from "react";

const Person = ({person, handleDelete}) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={handleDelete}>delete</button>
    </p>
  );
};

const Persons = ({list, handleDelete}) => {
  return (
    <div>
      {list.map((person, index) => (
        <Person
          key={index}
          person={person}
          handleDelete={() => handleDelete(person.id)}
        />
      ))}
    </div>
  );
};

export default Persons;
