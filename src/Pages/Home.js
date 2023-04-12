import React, { useContext, useEffect, useState } from "react";
import {
  getOutfitRecommendations,
  WeatherContext,
  WeatherOutfitContext,
} from "../contexts/WeatherContext";
import "../style.css";
import styled from "styled-components";
import {
  API_KEY,
  API_KEY_DUST,
  fetchDustData,
  fetchHourWeather,
  fetchNearbyMsrstn,
  fetchWeather,
} from "../utils/api";
import DustProgress from "../Components/Gauge";
import proj4 from "proj4";
import Timer from "../Components/Timer";

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
  margin-top: 30px;
  gap: 10px;
`;

const WeatherDay = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 25px;
  align-items: center;
  border-radius: 15px;
`;

const MainFlexBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainMidBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const MainTopBox = styled.div`
  margin-top: 10px;
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DayHours = styled.div``;

const DayIcon = styled.div``;

const DayTemp = styled.div`
  font-size: 22px;
  font-weight: 500;
`;

const DayFeelsLike = styled.div`
  font-size: 14px;
`;

const TemperatureText = styled.div`
  font-size: 24px;
  color: white;
`;

const CityText = styled.div`
  font-size: 24px;
  color: white;
`;

const Home = () => {
  const [temperature, setTemperature] = useState(null);
  const [weatherCode, setWeatherCode] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [hoursWeather, setHoursWeather] = useState([]);
  const [dust, setDust] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");

  const convertToTmCoords = async (coords) => {
    const epsg4326 = "+proj=longlat +datum=WGS84 +no_defs";
    const epsg5179 =
      "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
    const tm = await proj4(epsg4326, epsg5179, coords);
    return tm;
  };

  useEffect(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          //tm 좌표 변환계
          const tmCoords = await convertToTmCoords([
            position.coords.longitude,
            position.coords.latitude,
          ]);

          const nearbyMsrstn = await fetchNearbyMsrstn(
            tmCoords[0],
            tmCoords[1]
          );
          const dustData = await fetchDustData(nearbyMsrstn[0].stationName);
          const hourWeatherData = await fetchHourWeather(latitude, longitude);
          const weatherData = await fetchWeather(latitude, longitude);

          setTemperature(weatherData.main.temp);
          setWeatherCode(weatherData.weather[0].id);
          setWeatherIcon(weatherData.weather[0].icon);
          setCity(weatherData.name);
          setDust(dustData);
          setHoursWeather(hourWeatherData.list);
        } catch (error) {
          console.error(error);
        }

        setLoading(false);
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
          <MainFlexBox>
            <Timer></Timer>
            <MainTopBox>
              <TemperatureText className="temperature">
                {Math.floor(temperature)}&deg;C
              </TemperatureText>
              <CityText>{city}</CityText>
              <img
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${weatherIcon}.png`}
              />
            </MainTopBox>
            {/* midBox */}

            <MainMidBox>
              <DustProgress dust={dust}></DustProgress>
            </MainMidBox>

            {/* midBox */}
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
                    <DayTemp>{day.main.temp.toFixed(1)}&deg;C</DayTemp>
                    <DayFeelsLike>
                      체감 : {day?.main.feels_like}&deg;C
                    </DayFeelsLike>
                  </WeatherDay>
                );
              })}
            </WeatherHours>
          </MainFlexBox>
        )}
      </div>
    </Wrapper>
  );
};

export default Home;
