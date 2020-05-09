import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchResult from './SearchResult';


const SearchBar = () => {

  const initialCity = "Mysore";
  const [city, setCity] = useState(initialCity);
  const [cityWeather, setCityWeather] = useState({});
  const [cityName, setCityName] = useState(initialCity);

  const handleCity = event => {
      event.preventDefault();
      setCityName(city)
  } 

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ed4b308f42f0e027100ebd456036b27a&units=metric`)
      .then(res => {
        setCityWeather(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [cityName]);

  return (
    <div>
      <form onSubmit={handleCity}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        ></input>
        <button type="submit">Search</button>
      </form>
      <SearchResult details={cityWeather}/>
    </div>
  );
};

export default SearchBar;
