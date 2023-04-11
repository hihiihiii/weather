import React, { useContext, useEffect, useState } from "react";
import {
  getOutfitRecommendations,
  WeatherContext,
  WeatherOutfitContext,
} from "../contexts/WeatherContext";
import "../style.css";
import styled from "styled-components";
import { API_KEY, API_KEY_DUST, fetchHourWeather } from "../utils/api";
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

  useEffect(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //tm 좌표 변환계
        const epsg4326 = "+proj=longlat +datum=WGS84 +no_defs";
        const epsg5179 =
          "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
        const { latitude, longitude } = position.coords;
        const lnglat = [longitude, latitude];
        const tm = proj4(epsg4326, epsg5179, lnglat);
        const nearbyApiURL = `http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList?serviceKey=${API_KEY_DUST}&returnType=json&tmX=${tm[0]}&tmY=${tm[1]}&ver=1.0`;

        //근처 미세먼지 관측소 및 미세먼지 정보
        fetch(nearbyApiURL)
          .then((response) => response.json())
          .then((data) => {
            const apiURL = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=${data.response.body.items[0].stationName}&serviceKey=${API_KEY_DUST}&returnType=json&numOfRows=1&pageNo=1&dataTerm=DAILY&ver=1.0`;
            fetch(apiURL)
              .then((response) => response.json())
              .then((data) => {
                setDust(data.response.body.items[0]);
              });
          });

        // OpenWeather 날씨.
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
        setLoading(true);

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            setTemperature(data?.main.temp);
            setCity(data?.name);
            setWeatherCode(data?.weather[0].id);
            setWeatherIcon(data?.weather[0].icon);

            setLoading(false);
          });

        //실시간 날씨
        fetchHourWeather(latitude, longitude).then((data) =>
          setHoursWeather(data.list)
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
