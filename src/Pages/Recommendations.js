import React, { useContext } from "react";
import { WeatherContext } from "../contexts/WeatherContext";
import "../recommendations.css";

//외출 추천 페이지
//현재 날씨와 기온에 맞는 옷을추천 해주는 페이지.
const Recommendations = () => {
  const [weatherData, setWeatherData] = useContext(WeatherContext);

  console.log(weatherData);
  return (
    <div className="recommendations-container">
      <h1 className="recommendations-title">오늘의 추천의상</h1>
      <div className="recommendations-row">
        <div className="recommendation">
          <img src="casual.jpg" alt="casual" className="recommendation-image" />
          <h2 className="recommendation-title">캐주얼</h2>
          <p className="recommendation-description">
            친구와 함께 편안한 하루를 보내거나 심부름을 하기에 안성맞춤입니다.
          </p>
        </div>
        <div className="recommendation">
          <img src="formal.jpg" alt="formal" className="recommendation-image" />
          <h2 className="recommendation-title">공식적인 자리</h2>
          <p className="recommendation-description">
            중요한 회의나 행사에서는 날카롭고 전문적인 모습을 보입니다.
          </p>
        </div>
        <div className="recommendation">
          <img src="sporty.jpg" alt="sporty" className="recommendation-image" />
          <h2 className="recommendation-title">스포츠</h2>
          <p className="recommendation-description">
            운동에서 영감을 받은 이 룩으로 활동적이고 스타일리시해 보세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
