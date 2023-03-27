import React, { useContext, useState } from "react";
import SearchResult from "../Components/SearchResult";
import { API_KEY, WeatherContext } from "../contexts/WeatherContext";
import "../search.css";
import weatherDescKo from "../utils/weatherDescKo";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useContext(WeatherContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setIsLoading(false);
        setError("");
      } else {
        setIsLoading(false);
        setWeatherData(null);
        setError("입력한 도시는 없습니다.");
      }
    } catch (error) {
      setIsLoading(false);
      setError("에러 발생했습니다.");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <h1 className="search-title">What to Wear?</h1>
      <input
        type="text"
        placeholder="위치를 입력하세요."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
        className="search-input"
      />

      {weatherData ? (
        <SearchResult
          temperature={weatherData?.main.temp}
          description={weatherData?.weather[0].description}
          outfitItems={[]}
          icon={weatherData.weather[0].icon}
          weatherId={weatherData.weather[0].id}
        ></SearchResult>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
};

export default Search;
