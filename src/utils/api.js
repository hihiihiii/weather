export const API_KEY = "232642c5f791704439efb6f607f3451d";
export const API_KEY_DUST =
  "7vH3Ygf5V%2FVYxRdw%2FUFYXWn2u%2BQCKmaQx3jn5EGWhXNHKkDhHingie%2F9%2Bqdc2bUry7%2FmDJsu%2FIjvs4o1B0qTzg%3D%3D";

//48시간 기상알림
export const fetchHourWeather = async (latitude, longitude) => {
  const apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  const response = await fetch(apiURL);
  const data = await response.json();
  return data;
};

//근처 관측소
export const fetchNearbyMsrstn = async (tmX, tmY) => {
  const apiURL = `https://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList?serviceKey=${API_KEY_DUST}&returnType=json&tmX=${tmX}&tmY=${tmY}&ver=1.0`;
  const response = await fetch(apiURL);
  const data = await response.json();
  return data.response.body.items;
};

//해당 관측소 대기오염 정보
export const fetchDustData = async (stationName) => {
  const apiURL = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=${stationName}&serviceKey=${API_KEY_DUST}&returnType=json&numOfRows=1&pageNo=1&dataTerm=DAILY&ver=1.0`;
  const response = await fetch(apiURL);
  const data = await response.json();
  return data.response.body.items[0];
};

//현재 날씨 정보를 가져오는 함수
export const fetchWeather = async (latitude, longitude) => {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  const response = await fetch(apiURL);
  const data = await response.json();
  return data;
};
