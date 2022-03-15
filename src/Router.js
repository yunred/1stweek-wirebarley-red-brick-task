import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WireBarley from './pages/WireBarley';
import RedBrick from './pages/RedBrick';
import UseFetchExchangeRate from './utils/fetch/useFetchExchangeRate';
import useInterval from './utils/hooks/useInterval';
import { exchangeDataItems } from './store/data';
import store from './store';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Router = () => {
  const [intervalFlag, setIntervalFlag] = useState(true);
  const mockupData = exchangeDataItems;
  const [ExchangeData, SetExchangeData] = useState(mockupData);
  if (store.getLocalStorage() && !store.getLocalStorage().success) {
    store.setLocalStorage(mockupData);
  }

  useEffect(async () => {
    const time = new Date().getTime();
    if (store.getLocalStorage()) {
      //localData exist
      console.log('localdata is exist');
      if (
        time - store.getLocalStorage().timestamp * 1000 >
        86400000 /* 86400000ms = 24h */
      ) {
        console.log('data is outdated');
        let fetchedData = false;
        await UseFetchExchangeRate().then(data => (fetchedData = data));
        if (fetchedData.success) {
          store.setLocalStorage(fetchedData);
          SetExchangeData(store.getLocalStorage());
          console.log('get success', store.getLocalStorage(), ExchangeData);
        } else {
          console.log('fetched Fail', fetchedData);
        }
      } else {
        SetExchangeData(store.getLocalStorage());
        console.log('data in indated', store.getLocalStorage(), ExchangeData);
      }
    } else {
      // localData can't find
      console.log('localData can not find');
      store.setLocalStorage(mockupData);

      if (
        time - store.getLocalStorage().timestamp * 1000 >
        86400000 /* 86400000ms = 24h */
      ) {
        await UseFetchExchangeRate().then(data => store.setLocalStorage(data));
        console.log('data is outdated');
        let fetchedData = false;
        await UseFetchExchangeRate().then(data => (fetchedData = data));
        if (fetchedData.success) {
          store.setLocalStorage(fetchedData);
          SetExchangeData(store.getLocalStorage());
          console.log('get success', store.getLocalStorage(), ExchangeData);
        } else {
          console.log('fetched Fail', fetchedData);
        }
      } else {
        SetExchangeData(store.getLocalStorage());
        console.log('data in indated', store.getLocalStorage(), ExchangeData);
      }
    }
  }, [intervalFlag, mockupData]);

  useInterval(() => {
    setIntervalFlag(!intervalFlag);
  }, 86400000);
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
