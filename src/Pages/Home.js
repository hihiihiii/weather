import React, { useEffect, useState } from "react";
import { API_KEY } from "../contexts/WeatherContext";

const Home = () => {
  const [temperature, setTemperature] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState(null);
  //도시 이름
  const [city, setCity] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            setTemperature(data.main.temp);
            setCity(data.name);
            setWeatherDescription(data.weather[0].main);
          });
      },
      (error) => {
        console.error(error);
      }
    );
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Outfit Picker</h1>
      </header>
      <div className="weather-container">
        <div className="temperature">{Math.floor(temperature)}&deg;C</div>
        <div className="weather-description">{weatherDescription}</div>
      </div>
      <div className="outfit-container">
        <h2 className="outfit-title">추천 의상</h2>
        <div className="outfit-items">
          <img src="tshirt.jpg" alt="T-shirt" className="outfit-item" />
          <img src="shorts.jpg" alt="Shorts" className="outfit-item" />
          <img src="sneakers.jpg" alt="Sneakers" className="outfit-item" />
        </div>
      </div>
    </div>
  );
};

export default Home;
