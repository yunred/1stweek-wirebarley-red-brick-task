import React, { useState } from 'react';
import CurrencyDropDown from './CurrencyDropDown';
import ExChangeRateDisPlay from './ExcahngeRateDisplay';

const RedBrick = () => {
  const [baseCurrency, setBaseCurrency] = useState(0)
  return (
    <>
      <CurrencyDropDown base = {baseCurrency} baseSetter = {setBaseCurrency}/>
      <ExChangeRateDisPlay base = {baseCurrency} baseSetter = {setBaseCurrency}/>
    </>
  );
};

export default RedBrick;
