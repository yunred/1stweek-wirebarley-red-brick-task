import CurrencyDropDown from './CurrencyDropDown';
import ExChangeRateDisPlay from './ExchangeRateDisplay';
import React, { useState } from 'react';
import styled from 'styled-components';

const Inputbox = styled.input`
  border: solid 2px black;
  text-align: center;
  padding-top: 4px;
  padding-bottom: 4px;
`;

const RedBrick = () => {
  const [baseCurrency, setBaseCurrency] = useState(0)    
  const [amount, setAmount] = useState();
  const onInputAmount = e => {
    e.preventDefault();
    setAmount(e.target.value.replace(/[^0-9]/g, ''));
    console.log(amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  };

  return (
    <>
      <Inputbox
        type="text"
        onChange={onInputAmount}
        value={
          amount && amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
      />
      <CurrencyDropDown base = {baseCurrency} baseSetter = {setBaseCurrency}/>
      <ExChangeRateDisPlay base = {baseCurrency} baseSetter = {setBaseCurrency}/>
    </>
  );
};

export default RedBrick;
