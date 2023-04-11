import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TimerBlock = styled.div`
  color: #fff;
  text-align: center;
  font-size: 24px;
  width: 200px;
  align-self: center;
`;

const Timer = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(new Date());
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  return <TimerBlock>{time.toLocaleTimeString()}</TimerBlock>;
};

export default React.memo(Timer);
