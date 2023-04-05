import React, { useEffect, useState } from "react";
import { weatherDescKo } from "../contexts/WeatherContext";
import "../search.css";

const SearchResult = ({
  temperature,
  outfitItems,
  description,
  icon,
  weatherId,
}) => {
  const [weatherDesc, setWeatherDesc] = useState("");
  // description 설명
  // outfitItems 추천 의상
  // temperature -> 온도
  const codeId = weatherDescKo.find((code) => code[weatherId]);

  useEffect(() => {
    setWeatherDesc(Object.values(codeId).join(""));
  }, []);

  return (
    <div className="results-container">
      <div className="weather-info">
        <img
          src={`https://openweathermap.org/img/wn/${icon}.png`}
          alt="weather icon"
          className="weather-icon"
        />
        <p className="temperature">{Math.floor(temperature)}&deg; C</p>
        <p className="weather-description">{weatherDesc}</p>
      </div>
      <div className="outfit-recommendation">
        <h2 className="outfit-title">Outfit Recommendation</h2>
        <div className="outfit-items">
          <img src="shirt.png" alt="shirt" className="outfit-item" />
          <img src="pants.png" alt="pants" className="outfit-item" />
          <img src="shoes.png" alt="shoes" className="outfit-item" />
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
