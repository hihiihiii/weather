import React, { useEffect, useState } from "react";
import { API_KEY } from "../contexts/WeatherContext";
import weatherDescKo from "../utils/weatherDescKo";
import "../style.css";
import styled from "styled-components";

const Wrapper = styled.div`
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
      return "url(/asset/rain.jpg)";
    } else if (props.weatherCode >= 600 && props.weatherCode <= 622) {
      return "url(/asset/snow.jpg)";
    } else if (props.weatherCode >= 701 && props.weatherCode <= 781) {
      return "url(/asset/fog.jpg)";
    } else if (props.weatherCode === 800) {
      return "url(/asset/clearSky.jpg)";
    } else if (props.weatherCode >= 801 && props.weatherCode <= 804) {
      return "url(/asset/cloudy.jpg)";
    }
  }};
  background-repeat: no-repeat;
  background-size: cover;
`;

const Spinner = styled.div`
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

const Home = () => {
  const [temperature, setTemperature] = useState(null);
  const [weatherCode, setWeatherCode] = useState(800);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");

  console.log(temperature);

  useEffect(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
        setLoading(true);
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            setTemperature(data.main.temp);
            setCity(data.name);
            setWeatherCode(data.weather[0].id);
            setWeatherIcon(data.weather[0].icon);
            setLoading(false);
            // 한국어 변경 코드
            // const code = weatherDescKo.find((el) => el[data.weather[0].id]);
            // setWeatherDescription(Object.values(code).join(""));
          });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return (
    <Wrapper weatherCode={weatherCode} className="App">
      <div className="weather-container">
        {loading ? (
          <Spinner></Spinner>
        ) : (
          <>
            <div className="temperature">{Math.floor(temperature)}&deg;C</div>
            <div className="city-name">{city}</div>
            <img
              className="weather-icon"
              src={`https://openweathermap.org/img/wn/${weatherIcon}.png`}
            />
          </>
        )}
      </div>
      <div className="outfit-container">
        <h2 className="outfit-title">추천 의상</h2>
        <div className="outfit-items">
          <img src="tshirt.jpg" alt="T-shirt" className="outfit-item" />
          <img src="shorts.jpg" alt="Shorts" className="outfit-item" />
          <img src="sneakers.jpg" alt="Sneakers" className="outfit-item" />
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
