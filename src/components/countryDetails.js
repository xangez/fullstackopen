import React from "react";

const CountryDetails = ({country}) => {
  return (
    <>
      <h2>{country.name}</h2>
      <p>{country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((lang, index) => (
          <li key={index}>{lang.name}</li>
        ))}
      </ul>
      <img style={{width: "100px"}} src={country.flag} alt="flag"></img>
    </>
  );
};

export default CountryDetails;
