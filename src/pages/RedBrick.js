<<<<<<< HEAD
import React, { useState } from "react";
import CurrencyDropDown from "./CurrencyDropDown";
=======
import CurrencyDropDown from './CurrencyDropDown';
import React, { useState } from 'react';
import styled from 'styled-components';
>>>>>>> upstream/main

const Inputbox = styled.input`
  border: solid 2px black;
  text-align: center;
  padding-top: 4px;
  padding-bottom: 4px;
`;
const RedBrick = () => {
  const [amount, setAmount] = useState();
  const onInputAmount = e => {
    e.preventDefault();
    setAmount(e.target.value.replace(/[^0-9]/g, ''));
    console.log(amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  };
  return (
    <>
<<<<<<< HEAD
=======
      <Inputbox
        type="text"
        onChange={onInputAmount}
        value={
          amount && amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
      />
>>>>>>> upstream/main
      <CurrencyDropDown />
    </>
  );
};

export default RedBrick;
