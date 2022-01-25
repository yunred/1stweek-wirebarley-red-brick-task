import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WireBarley from './pages/WireBarley';
import RedBrick from './pages/RedBrick';
import UseFetchExchangeRate from './utils/fetch/useFetchExchangeRate';
import useInterval from './utils/hooks/useInterval';
import { exchangeDataItems } from './store/data';
import store from './store';

const Router = () => {
  const [intervalFlag, setIntervalFlag] = useState(true);
  const mockupData = exchangeDataItems;
  useEffect(() => {
    const time = Math.round(new Date().getTime() / 1000);
    if (store.getLocalStorage()) {
      if (time - store.getLocalStorage().timestamp > 86400000) {
        UseFetchExchangeRate().then(data => store.setLocalStorage(data));
      }
    } else {
      store.setLocalStorage(mockupData);
    }
  }, [intervalFlag, mockupData]);
  useInterval(() => {
    setIntervalFlag(!intervalFlag);
  }, 86400000);
  const ExchangeData = store.getLocalStorage();

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
