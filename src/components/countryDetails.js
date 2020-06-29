import React from "react";
import CityWeather from "./cityWeather";

const CountryDetails = ({country}) => {
  const {name, capital, population, languages, flag} = country;

  return (
    <>
      <h2>{name}</h2>
      <p>{capital}</p>
      <p>Population: {population}</p>
      <h3>Spoken languages</h3>
      <ul>
        {languages.map((lang, index) => (
          <li key={index}>{lang.name}</li>
        ))}
      </ul>
      <img style={{width: "100px"}} src={flag} alt="flag"></img>
      <CityWeather city={capital} name={name} />
    </>
  );
};

export default CountryDetails;
