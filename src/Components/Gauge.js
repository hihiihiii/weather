import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";

const Container = styled.div`
  width: 140px;
`;

const ContainerText = styled.div`
  color: white;
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
`;

const Status = styled.p`
  font-size: 14px;
  margin-top: 5px;
`;

const Span = styled.span`
  font-size: 13px;
`;

const DustProgress = ({ dust }) => {
  const [percentage, setpercentage] = useState(0);
  //Pm25
  const [pm25Status, setPm25Status] = useState("");
  const [pm25Color, setPm25Color] = useState("");
  //Pm10
  const [pm10Color, setPm10Color] = useState("");
  const [pm10Status, setPm10Status] = useState("");
  //ozone
  const [ozoneStatus, setOzoneStatus] = useState("");
  const [ozoneColor, setOzoneColor] = useState("");

  useEffect(() => {
    const pm25Value = parseInt(dust?.pm25Value);
    if (pm25Value >= 0 && pm25Value <= 15) {
      setPm25Status("좋음");
      setPm25Color("#3498db");
    } else if (pm25Value >= 16 && pm25Value <= 35) {
      setPm25Status("보통");
      setPm25Color("#2ecc71");
    } else if (pm25Value >= 36 && pm25Value <= 75) {
      setPm25Status("나쁨");
      setPm25Color("#f1c40f");
    } else if (pm25Value > 75) {
      setPm25Status("매우나쁨");
      setPm25Color("#e74c3c");
    }
  }, [dust]);

  useEffect(() => {
    const pm10Value = dust?.pm10Value;
    if (pm10Value >= 0 && pm10Value <= 30) {
      setPm10Status("좋음");
      setPm10Color("#3498db");
    } else if (pm10Value >= 31 && pm10Value <= 81) {
      setPm10Status("보통");
      setPm10Color("#2ecc71");
    } else if (pm10Value >= 81 && pm10Value <= 150) {
      setPm10Status("나쁨");
      setPm10Color("#f1c40f");
    } else if (pm10Value > 150) {
      setPm10Status("매우나쁨");
      setPm10Color("#e74c3c");
    }
  }, [dust]);

  useEffect(() => {
    const o3Value = dust?.o3Value;
    if (o3Value >= 0 && o3Value <= 0.03) {
      setOzoneStatus("좋음");
      setOzoneColor("#3498db");
    } else if (o3Value >= 0.031 && o3Value <= 0.09) {
      setOzoneStatus("보통");
      setOzoneColor("#2ecc71");
    } else if (o3Value >= 0.091 && o3Value <= 0.15) {
      setOzoneStatus("나쁨");
      setOzoneColor("#f1c40f");
    } else if (o3Value > 0.15) {
      setOzoneStatus("매우나쁨");
      setOzoneColor("#e74c3c");
    }
  }, [dust]);

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
            pathColor: pm25Color,
            textColor: "#fff",
            trailColor: pm25Color,
            backgroundColor: "#3e98c7",
          })}
        />
        <ContainerText>
          <h4>
            초미세먼지<Span>(PM2.5)</Span>
          </h4>
          <Status>{pm25Status}</Status>
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
            pathColor: pm10Color,
            textColor: "#fff",
            trailColor: pm10Color,
            backgroundColor: "#3e98c7",
          })}
        />

        <ContainerText>
          <h4>
            미세먼지<Span>(PM10)</Span>
          </h4>
          <Status>{pm10Status}</Status>
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
            pathColor: ozoneColor,
            textColor: "#fff",
            trailColor: ozoneColor,
            backgroundColor: "#3e98c7",
          })}
        />
        <ContainerText>
          <h4>
            오존<Span>(O3)</Span>
          </h4>
          <Status>{ozoneStatus}</Status>
        </ContainerText>
      </Container>
    </>
  );
};

export default React.memo(DustProgress);
