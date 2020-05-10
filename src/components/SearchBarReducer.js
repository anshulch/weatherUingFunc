import React, { useEffect, useReducer, useRef } from "react";
import axios from "axios";
import SearchResult from "./SearchResult";

const initialState = {
  loading: true,
  error: false,
  city: {},
  cityName: "coorg",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        city: action.payload,
        error: false,
        cityName: state.cityName,
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        city: {},
        error: true,
        cityName: state.cityName,
      };
    case "GET_DETAILS":
      return {
        ...state,
        loading: true,
        cityName: action.payload,
        error: false,
      };
    default: {
      return state;
    }
  }
};

const SearchBarReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${state.cityName}&appid=ed4b308f42f0e027100ebd456036b27a&units=metric`
      )
      .then((res) => {
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ERROR" });
      });
  }, [state.cityName]);

  const handleCity = (event) => {
    event.preventDefault();
      if(state.cityName !== inputRef.current.value){
        dispatch({ type: "GET_DETAILS", payload: inputRef.current.value });
      }
  };

  return (
    <div className="search__box">
      <h1>Using - LOCAL useReducer with <span className="error">error</span> state - change city name</h1>
      <form onSubmit={handleCity}>
        <input type="text" defaultValue={state.cityName} ref={inputRef} />
        <button type="submit">Search</button>
      </form>
      {state.error? <div className="error">Error while loding data</div>:null}
      {state.loading ? (
        <div className="animated-bg">
          <div className="background-mask"></div>
          <div className="background-mask"></div>
          <div className="background-mask"></div>
          <div className="background-mask"></div>
          <div className="background-mask"></div>
        </div>
      ) : null}
      <SearchResult details={state.city} />
    </div>
  );
};

export default SearchBarReducer;
