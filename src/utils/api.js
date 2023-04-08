export const API_KEY = "232642c5f791704439efb6f607f3451d";
export const API_KEY_DUST =
  "7vH3Ygf5V%2FVYxRdw%2FUFYXWn2u%2BQCKmaQx3jn5EGWhXNHKkDhHingie%2F9%2Bqdc2bUry7%2FmDJsu%2FIjvs4o1B0qTzg%3D%3D";

export const fetchHourWeather = (latitude, longitude) => {
  try {
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    ).then((response) => response.json());
  } catch (error) {
    return console.log(error);
  }
};
