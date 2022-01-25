import React from 'react';
import UseFetchExchangeRate from '../utils/axios/useFetchExchangeRate';
import useInterval from '../utils/hooks/useInterval';

const WireBarley = () => {
  useInterval(() => {
    UseFetchExchangeRate().then(data => console.log(data.quotes));
  }, 3000);
  return (
    <>
      <div>와이어바일리입니다</div>
    </>
  );
};

export default WireBarley;
