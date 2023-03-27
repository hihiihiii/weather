import React from "react";
import "../recommendations.css";

//외출 추천 페이지
//현재 날씨와 기온에 맞는 옷을추천 해주는 페이지.
const Recommendations = () => {
  return (
    <div className="recommendations-container">
      <h1 className="recommendations-title">Outfit Recommendations</h1>
      <div className="recommendations-row">
        <div className="recommendation">
          <img src="casual.jpg" alt="casual" className="recommendation-image" />
          <h2 className="recommendation-title">Casual</h2>
          <p className="recommendation-description">
            Perfect for a relaxed day out with friends or running errands.
          </p>
        </div>
        <div className="recommendation">
          <img src="formal.jpg" alt="formal" className="recommendation-image" />
          <h2 className="recommendation-title">Formal</h2>
          <p className="recommendation-description">
            Look sharp and professional for important meetings or events.
          </p>
        </div>
        <div className="recommendation">
          <img src="sporty.jpg" alt="sporty" className="recommendation-image" />
          <h2 className="recommendation-title">Sporty</h2>
          <p className="recommendation-description">
            Get active and stylish with these athletic-inspired looks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
