import React, { useEffect, useContext, useRef } from "react";
import axios from "axios";
import SearchResult from "./SearchResult";
import { CityContext } from "../App";

const SearchResultContextNReducers = () => {
  const cityContext = useContext(CityContext);
  const inputRef = useRef();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityContext.cityState.cityName}&appid=ed4b308f42f0e027100ebd456036b27a&units=metric`
      )
      .then((res) => {
        cityContext.cityDispatch({ type: "FETCH_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        cityContext.cityDispatch({ type: "FETCH_ERROR" });
      });
  }, [cityContext.cityState.cityName]);

  const handleCity = (event) => {
    event.preventDefault();
    if (cityContext.cityState.cityName !== inputRef.current.value) {
      cityContext.cityDispatch({
        type: "GET_DETAILS",
        payload: inputRef.current.value,
      });
    }
  };

  return (
    <div className="search__box">
      <h1>Using <span className="success">addon features</span> - GLOBAL useContext and useReducer</h1>
      <form onSubmit={handleCity}>
        <input
          type="text"
          defaultValue={cityContext.cityState.cityName}
          ref={inputRef}
        />
        <button type="submit">Search</button>
      </form>
      {cityContext.cityState.error? <div className="error">Error while loding data</div>:null}
      {cityContext.cityState.loading ? (
        <div className="animated-bg">
          <div className="background-mask"></div>
          <div className="background-mask"></div>
          <div className="background-mask"></div>
          <div className="background-mask"></div>
          <div className="background-mask"></div>
        </div>
      ) : null}
      <SearchResult details={cityContext.cityState.city} />
    </div>
  );
};

export default SearchResultContextNReducers;
