import React from "react";

const Person = ({person}) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const Persons = ({list}) => {
  return (
    <div>
      {list.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

export default Persons;
