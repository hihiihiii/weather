import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";

const Container = styled.div`
  width: 100px;
`;

const ContainerText = styled.div`
  color: white;
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
`;

const DustProgress = ({ dust }) => {
  const [percentage, setpercentage] = useState(0);

  const pm25Colors = [
    { min: 0, max: 15, color: "blue" },
    { min: 16, max: 35, color: "green" },
    { min: 36, max: 75, color: "yellow" },
    { min: 76, max: 500, color: "red" },
  ];

  const pm10Colors = [
    { min: 0, max: 30, color: "blue" },
    { min: 31, max: 81, color: "green" },
    { min: 81, max: 150, color: "yellow" },
    { min: 151, max: 600, color: "red" },
  ];

  const ozoneColors = [
    { min: 0, max: 0.03, color: "blue" },
    { min: 0.031, max: 0.09, color: "green" },
    { min: 0.091, max: 0.15, color: "yellow" },
    { min: 0.151, max: 0.6, color: "red" },
  ];

  const pm10Color =
    pm10Colors.find(
      (color) => color.min <= dust?.pm10Value && color.max >= dust?.pm10Value
    )?.color || "blue";

  const pm25Color =
    pm25Colors.find(
      (color) => color.min <= dust?.pm25Value && color.max >= dust?.pm25Value
    )?.color || "blue";

  const ozoneColor =
    ozoneColors.find(
      (color) => color.min <= dust?.o3Value && color.max >= dust?.o3Value
    )?.color || "blue";

  //
  // const percentageBar = (color) => {
  //   const colorPercent = color
  //   return;
  // };

  return (
    <>
      <Container>
        <CircularProgressbar
          value={percentage}
          text={`${dust?.pm25Value}㎍/m³`}
          styles={buildStyles({
            strokeLinecap: "butt",
            textSize: "16px",
            pathTransitionDuration: 0.5,
            pathColor: `rgba(52,152,219,1)`,
            textColor: "#fff",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}
        />
        <ContainerText>
          <h4>초미세먼지(PM2.5)</h4>
        </ContainerText>
      </Container>

      <Container>
        <CircularProgressbar
          value={percentage}
          text={`${dust?.pm10Value}㎍/m³`}
          styles={buildStyles({
            strokeLinecap: "butt",
            textSize: "16px",
            pathTransitionDuration: 0.5,
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            textColor: "#fff",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}
        />

        <ContainerText>
          <h4>미세먼지(PM10)</h4>
        </ContainerText>
      </Container>

      <Container>
        <CircularProgressbar
          value={percentage}
          text={`${dust?.o3Value}ppm`}
          styles={buildStyles({
            strokeLinecap: "butt",
            textSize: "16px",
            pathTransitionDuration: 0.5,
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            textColor: "#fff",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}
        />

        <ContainerText>
          <h4>오존</h4>
        </ContainerText>
      </Container>
    </>
  );
};

export default React.memo(DustProgress);
