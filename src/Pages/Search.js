import React, { useContext, useState } from "react";
import SearchResult from "../Components/SearchResult";
import { API_KEY, WeatherContext } from "../contexts/WeatherContext";
import "../search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [weatherData, setWeatherData] = useContext(WeatherContext);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // API call to get weather data and update results state
    // Example response data:

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        console.log(data);
      });
  };

  return (
    <div className="search-container">
      <h1 className="search-title">What to Wear?</h1>
      <input
        type="text"
        placeholder="위치를 입력하세요."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      {data.length > 0 ? (
        <SearchResult
          temperature={data[0].temperature}
          description={data[0].description}
          outfitItems={data[0].outfitItems}
        ></SearchResult>
      ) : (
        <p className="no-results-message">No results found.</p>
      )}
    </div>
  );
};

export default Search;
