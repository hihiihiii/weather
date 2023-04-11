import React, { useContext, useEffect, useState } from "react";
import {
  getOutfitRecommendations,
  WeatherContext,
  WeatherOutfitContext,
} from "../contexts/WeatherContext";
import styled from "styled-components";
import { API_KEY } from "../utils/api";

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const RecommendationsContainer = styled.div`
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

const RecommendationsTitle = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
`;

const RecommendationsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
`;

const Recommendation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const RecommendationImage = styled.img`
  width: 200px;
  height: 200px;
  padding: 10px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const RecommendationTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
`;

const RecommendationDescription = styled.p`
  font-size: 16px;

  text-align: center;
  margin-top: 10px;
`;

const Spinner = styled.div`
  height: 100vh;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top-color: #1a1aff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Recommendations = () => {
  const [outfit, setOutfit] = useContext(WeatherOutfitContext);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherCode, setWeatherCode] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            const outfit = getOutfitRecommendations(
              data.main.temp,
              data.weather[0].id
            );
            setOutfit(outfit);
            setWeatherCode(data.weather[0].id);
          });
        setIsLoading(false);
      },
      (error) => console.error(error)
    );
  }, []);

  //각 추천 의상에 대한 설명
  //추천 의상을 입는데 적합한 활동
  //추가적인 팁
  return (
    <>
      {isLoading ? (
        <SpinnerContainer>
          <Spinner></Spinner>
        </SpinnerContainer>
      ) : (
        <RecommendationsContainer weatherCode={weatherCode}>
          <RecommendationsTitle>오늘의 추천의상</RecommendationsTitle>
          <RecommendationsRow>
            {outfit.map((el, index) => {
              return (
                <Recommendation key={index}>
                  <RecommendationImage src={el?.item} alt={`outfit-${index}`} />
                  <RecommendationTitle>{el?.title}</RecommendationTitle>
                  <RecommendationDescription>
                    {el?.tip}
                  </RecommendationDescription>
                </Recommendation>
              );
            })}
          </RecommendationsRow>
        </RecommendationsContainer>
      )}
    </>
  );
};

export default Recommendations;
