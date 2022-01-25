import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WireBarley from './pages/WireBarley';
import RedBrick from './pages/RedBrick';
import UseFetchExchangeRate from './utils/fetch/useFetchExchangeRate';
import useInterval from './utils/hooks/useInterval';

const Router = () => {
  const [ExchangeData, setExchangeData] = useState();
  const [intervalFlag, setIntervalFlag] = useState(true);
  useEffect(() => {
    UseFetchExchangeRate().then(data => setExchangeData(data));
  }, [intervalFlag]);
  useInterval(() => {
    setIntervalFlag(!intervalFlag);
  }, 3640000);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WireBarley data={ExchangeData} />} />
        <Route path="/RedBrick" element={<RedBrick data={ExchangeData} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
