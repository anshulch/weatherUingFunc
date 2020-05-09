import React from "react";

const SearchResult = (props) => {
  const { name, main } = props.details;
  return (
    <div className="result__section">
      <div className="city">{name}</div>
      {main ? (
        <ul>
          <li>
            <span>Temperature</span>
            {main.temp}
          </li>
          <li>
            <span>Feels like</span>
            {main.feels_like}
          </li>
          <li>
            <span>Min</span>
            {main.temp_min}
          </li>
          <li>
            <span>Max</span>
            {main.temp_max}
          </li>
          <li>
            <span>Humidity</span>
            {main.humidity}
          </li>
        </ul>
      ) : null}
    </div>
  );
};
export default SearchResult;
