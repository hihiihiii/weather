export const API_KEY = "232642c5f791704439efb6f607f3451d";
//시간대별 기온
export const fetchHourWeather = (latitude, longitude) => {
  try {
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    ).then((response) => response.json());
  } catch (error) {
    return console.log(error);
  }
};
