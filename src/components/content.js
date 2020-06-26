import React from "react";
import Part from "./part";  
import Total from "./total"

const Content = ({parts}) => {
  const total = parts.reduce((accumulator, part) => 
    accumulator + part.exercises, 0
  );
  
  return (
  <>
    <div>{parts.map((part) => <Part key={part.id} part={part} />)}</div>
    <Total total={total} />
  </>
  );
};

export default Content;
