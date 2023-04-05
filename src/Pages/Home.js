import React, { useEffect, useState } from "react";
import { getOutfitRecommendations } from "../contexts/WeatherContext";
import "../style.css";
import styled from "styled-components";
import { API_KEY, fetchHourWeather } from "../utils/api";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
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

const WeatherHours = styled.div`
  display: flex;
  /* flex-direction: column; */
  margin-top: 30px;
  gap: 10px;
`;

const WeatherDay = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 25px;
  align-items: center;
  border-radius: 15px; ;
`;

const DayHours = styled.div``;

const DayIcon = styled.div``;

const DayTemp = styled.div`
  font-size: 22px;
  font-weight: 500;
`;

const Home = () => {
  const [temperature, setTemperature] = useState(null);
  const [weatherCode, setWeatherCode] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [hoursWeather, setHoursWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [outfit, setOutfit] = useState([]);

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
            console.log(data);
            setTemperature(data.main.temp);
            setCity(data.name);
            setWeatherCode(data.weather[0].id);
            setWeatherIcon(data.weather[0].icon);

            const outfits = getOutfitRecommendations(
              data.main.temp,
              data.weather[0].id
            );
            setOutfit(outfits);
            setLoading(false);
          });
        //날씨
        fetchHourWeather(latitude, longitude).then(
          (data) => setHoursWeather(data.list)
          // setHoursWeather(data?.list.filter((el)=> el?.dt))
        );
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
          {outfit?.map((item, index) => (
            <img
              src={item}
              alt={`outfit-${index}`}
              className="outfit-item"
              key={index}
            ></img>
          ))}
        </div>
        <WeatherHours>
          {hoursWeather.slice(0, 6).map((day, index) => {
            return (
              <WeatherDay key={index}>
                <DayHours>
                  {new Date(day.dt * 1000).toLocaleDateString("ko-KR", {
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                  })}
                </DayHours>
                <DayIcon>
                  <img
                    className="weather-icon"
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  />
                </DayIcon>
                <DayTemp>{Math.floor(day.main.temp)}&deg;C</DayTemp>
              </WeatherDay>
            );
          })}
        </WeatherHours>
      </div>
    </Wrapper>
  );
};

export default Home;
