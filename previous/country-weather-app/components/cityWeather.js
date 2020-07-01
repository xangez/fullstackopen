import React, {useState, useEffect} from "react";
import axios from "axios";

const CityWeather = ({name, city}) => {
  const [weather, setWeather] = useState("");

  useEffect(() => {
    const key = `${process.env.REACT_APP_WEATHER_KEY}`;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${name}&units=metric&APPID=${key}`;
    axios.get(url).then((response) => {
      setWeather(response.data);
    });
  }, []);

  if (weather === "") {
    return <div></div>;
  }

  return (
    <>
      <h3>Weather in {city}</h3>
      <p>Temperature: {weather.main.temp} Celcius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather-icon"
      ></img>
      <p>Wind: {weather.wind.speed} m/s</p>
    </>
  );
};

export default CityWeather;
