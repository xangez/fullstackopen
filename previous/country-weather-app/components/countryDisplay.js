import React from "react";
import CountryDetails from "./countryDetails";

const Countries = ({countries, filter, setFilter}) => {
  let list;
  const getCountries = () => {
    if (filter === "") {
      return [];
    }
    return countries.filter(
      (country) =>
        country.name.toLowerCase().startsWith(filter.toLowerCase()) === true
    );
  };

  const getDisplay = () => {
    return list.map((country, index) => {
      return (
        <div key={index}>
          {country.name}
          <button
            value={country.name}
            onClick={(e) => setFilter(e.target.value)}
          >
            show
          </button>
          <div>{}</div>
        </div>
      );
    });
  };

  const displayCountries = () => {
    list = getCountries();
    if (list.length > 10) {
      return "Too many matches, specify another filter";
    } else if (list.length === 1) {
      return <CountryDetails country={list[0]} />;
    } else {
      return getDisplay();
    }
  };

  return <>{displayCountries()}</>;
};

export default Countries;
