import React, { createContext, useState } from "react";

export const WeatherContext = createContext();

export const API_KEY = "232642c5f791704439efb6f607f3451d";

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  return (
    <WeatherContext.Provider value={[weatherData, setWeatherData]}>
      {children}
    </WeatherContext.Provider>
  );
};
