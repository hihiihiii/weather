import React, { useContext, useState } from "react";
import styled from "styled-components";
import SearchResult from "../Components/SearchResult";
import {
  getOutfitRecommendations,
  WeatherContext,
} from "../contexts/WeatherContext";
import { API_KEY } from "../utils/api";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: ${(props) => {
    if (props.weatherCode >= 200 && props.weatherCode <= 232) {
      return "url(/asset/rain.jpg)";
    } else if (props.weatherCode >= 300 && props.weatherCode <= 321) {
      return "url(/asset/lightRain.jpg)";
    } else if (props.weatherCode >= 500 && props.weatherCode <= 531) {
      return "url(/asset/rain.png)";
    } else if (props.weatherCode >= 600 && props.weatherCode <= 622) {
      return "url(/asset/snow.jpg)";
    } else if (props.weatherCode >= 701 && props.weatherCode <= 781) {
      return "url(/asset/fog.png)";
    } else if (props.weatherCode === 800) {
      return "url(/asset/clearSky.png)";
    } else if (props.weatherCode >= 801 && props.weatherCode <= 804) {
      return "url(/asset/cloudy.png)";
    }
  }};
  background-repeat: no-repeat;
  background-size: cover;
`;

const SearchTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 400px;
  height: 40px;
  font-size: 16px;
  padding: 10px;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const ResultError = styled.div``;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherCode, setWeatherCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [outfit, setOutfit] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
        setWeatherCode(data.weather[0].id);
        const outfit = getOutfitRecommendations(
          data?.main.temp,
          data?.weather[0].id
        );
        setOutfit(outfit);
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
    <SearchContainer weatherCode={weatherCode}>
      <SearchTitle>What to Wear?</SearchTitle>
      <SearchInput
        type="text"
        placeholder="영어로 입력바랍니다..!!"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      {weatherData ? (
        <SearchResult
          weather={weatherData}
          temperature={weatherData?.main.temp}
          description={weatherData?.weather[0].description}
          outfitItems={outfit}
          icon={weatherData.weather[0].icon}
          weatherId={weatherData.weather[0].id}
        ></SearchResult>
      ) : (
        <ResultError>{error}</ResultError>
      )}
    </SearchContainer>
  );
};

export default Search;
