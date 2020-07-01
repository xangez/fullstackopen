import React, {useEffect, useState} from "react";
import axios from "axios";
import Countries from "./components/countryDisplay";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <div>
        Find countries
        <input onChange={handleFilterChange} />
      </div>
      <Countries filter={filter} countries={countries} setFilter={setFilter} />
    </div>
  );
};

export default App;
