import CurrencyDropDown from './CurrencyDropDown';
import ExChangeRateDisPlay from './ExchangeRateDisplay';
import React, { useState } from 'react';
import styled from 'styled-components';


const Inputbox = styled.input`
  border: solid 2px black;
  text-align: center;
  padding-top: 4px;
  padding-bottom: 4px;
  margin-bottom: 1rem;
  width: 7rem;
`;

const RedBrick = () => {
  const [baseCurrency, setBaseCurrency] = useState(0)    
  const [amount, setAmount] = useState();
  const onInputAmount = (e) => {
    e.preventDefault();
    setAmount(e.target.value.replace(/[^0-9]/g, ""));
    console.log(amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  };

  const jsonData = require("./data.json");
  const quotesdata =  [1, jsonData.quotes["USDCAD"],jsonData.quotes["USDKRW"], jsonData.quotes["USDHKD"], jsonData.quotes["USDJPY"], jsonData.quotes["USDCNY"]];
  const time = new Date(parseInt(jsonData.timestamp) * 1000);
  return (
    <Container>
      <Inputbox
        type="text"
        onChange={onInputAmount}
        value={
          amount && amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
      />
      <DropDown>
        <CurrencyDropDown base = {baseCurrency} baseSetter = {setBaseCurrency}/>
      </DropDown>
      <ExChangeRateDisPlay base = {baseCurrency} amount={amount} time = {time} quotesdata = {quotesdata}/>
    </Container>
  );
};

const Container = styled.div`
display: flex;
flex-direction: column;
width: fit-content;
height: fit-content;
margin-top: 5rem;
margin-left: 2rem;
padding: 1rem;
border: solid 3px rgb(1,1,1);
`

const DropDown = styled.div`
position: absolute;
left: 14rem;
top: 5.2rem
`

export default RedBrick;
