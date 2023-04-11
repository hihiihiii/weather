import React, { useEffect, useState } from "react";
import { weatherDescKo } from "../contexts/WeatherContext";
import styled from "styled-components";

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const WeatherInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  gap: 20px;
`;

const WeatherIcon = styled.img`
  width: 60px;
  height: 60px;
`;

const Temperature = styled.p`
  font-size: 26px;
`;

const OutfitRecommendation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const OutfitTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: white;
`;

const OutfitItems = styled.div`
  display: flex;
  gap: 20px;
`;

const OutfitItem = styled.img`
  padding: 10px;
  width: 120px;
  height: 120px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.25), 0 0px 0px rgba(0, 0, 0, 0.22);
  border-radius: 15px;
`;

const CityName = styled.div`
  font-size: 26px;
`;

const SearchResult = ({ temperature, outfitItems, weather, icon }) => {
  // const [weatherDesc, setWeatherDesc] = useState("");
  // description 설명
  // outfitItems 추천 의상
  // temperature -> 온도

  return (
    <ResultsContainer>
      <WeatherInfo>
        <Temperature>{Math.floor(temperature)}&deg;C</Temperature>
        <CityName>{weather?.name}</CityName>
        <WeatherIcon src={`https://openweathermap.org/img/wn/${icon}.png`} />
      </WeatherInfo>
      <OutfitRecommendation>
        <OutfitTitle>오늘의 복장</OutfitTitle>
        <OutfitItems>
          {outfitItems.map((el, index) => {
            return <OutfitItem key={index} src={el?.item} />;
          })}
        </OutfitItems>
      </OutfitRecommendation>
    </ResultsContainer>
  );
};

export default SearchResult;
