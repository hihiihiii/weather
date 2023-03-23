import React from "react";
import "../search.css";

const SearchResult = ({ temperature, outfitItems, description }) => {
  // description 설명
  // outfitItems 추천 의상
  // temperature -> 온도
  return (
    <div className="results-container">
      <div className="weather-info">
        <img
          src="weather-icon.png"
          alt="weather icon"
          className="weather-icon"
        />
        <p className="temperature">72&deg; F</p>
        <p className="weather-description">Sunny</p>
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
