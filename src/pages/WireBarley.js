import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UseFetchExchangeRate from '../utils/fetch/useFetchExchangeRate';
import useInterval from '../utils/hooks/useInterval';

const WireBarley = () => {
  const [intervalFlag, setIntervalFlag] = useState(true);
  useEffect(() => {
    UseFetchExchangeRate().then(data => console.log(data.quotes));
  }, [intervalFlag]);
  useInterval(() => {
    setIntervalFlag(!intervalFlag);
  }, 3000);
  return (
    <>
      <Link to="/RedBrick">두 번째 계산기</Link>
      <div>와이어바일리입니다</div>
    </>
  );
};

export default WireBarley;
