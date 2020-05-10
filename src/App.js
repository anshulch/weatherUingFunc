import React, {useReducer} from 'react';
import './App.css';

// components imports
import SearchBar from './components/SearchBar';
import SearchBarReducer from './components/SearchBarReducer';
import SearchResultContextNReducers from './components/SearchResultContextNReducers';

export const CityContext = React.createContext();

const initialState = {
  loading: true,
  error: false,
  city: {},
  cityName: "bangalore",
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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CityContext.Provider value={{cityState: state, cityDispatch: dispatch}}>
      <div className="App">
        <SearchResultContextNReducers />
        <SearchBarReducer />
        <SearchBar />
      </div>
    </CityContext.Provider>
  );
}

export default App;
