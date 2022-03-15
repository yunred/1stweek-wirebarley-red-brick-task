import CurrencyDropDown from './CurrencyDropDown';
import ExChangeRateDisPlay from './ExchangeRateDisplay';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Inputbox = styled.input`
  border: solid 2px black;
  text-align: center;
  padding-top: 4px;
  padding-bottom: 4px;
  margin-bottom: 1rem;
  width: 7rem;
`;

const RedBrick = props => {
  const [baseCurrency, setBaseCurrency] = useState(0);
  const [amount, setAmount] = useState('');
  const [pointFlag, setPointFlag] = useState(0);
  const [isOnePoint, setIsOnePoint] = useState(true);

  function toNumberFormat(num) {
    if (pointFlag === 1 && isOnePoint === true) {
      String(num.toLocaleString('ko-KR') + '.');
    } else {
      return num.toLocaleString('ko-KR');
    }
  }

  const handleInputAmount = e => {
    e.preventDefault();
    let num = String(e.target.value.replace(/[^0-9.]/g, ''));
    if (num[num.length - 1] === '.') {
      setIsOnePoint(num.indexOf('.') === num.length - 1);
      setPointFlag(1);
      setAmount(num.substring(0, num.length - 1));
    } else {
      setPointFlag(0);
      setAmount(num);
    }
  };

  const jsonData = props.data;
  const quotesdata = [
    1,
    jsonData.quotes['USDCAD'],
    jsonData.quotes['USDKRW'],
    jsonData.quotes['USDHKD'],
    jsonData.quotes['USDJPY'],
    jsonData.quotes['USDCNY'],
  ];
  const time = new Date(parseInt(jsonData.timestamp) * 1000);
  return (
    <>
      <Link to="/">
        <button>와이어바알리</button>
      </Link>
      <Container>
        <Inputbox
          type="text"
          onChange={handleInputAmount}
          value={amount && toNumberFormat(Number(amount))}
        />
        <DropDown>
          <CurrencyDropDown base={baseCurrency} baseSetter={setBaseCurrency} />
        </DropDown>
        <ExChangeRateDisPlay
          base={baseCurrency}
          amount={amount}
          time={time}
          quotesdata={quotesdata}
        />
      </Container>
    </>
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
  border: solid 3px rgb(1, 1, 1);
`;

const DropDown = styled.div`
  position: absolute;
  left: 14rem;
  top: 7.2rem;
`;

export default RedBrick;
