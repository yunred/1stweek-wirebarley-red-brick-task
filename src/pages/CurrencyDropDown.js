import React from 'react';
import styled from 'styled-components';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CurrencyDropDown = (props) => {
  const currencyList = ['USD','CAD', 'KRW', 'HKD', 'JPY', 'CNY'];
  const SubCurrency = [];
  const baseCurrency = props.base;
  const setBaseCurrency = props.baseSetter;

  for (let i = 0; i < currencyList.length; i++){
    if(i === baseCurrency){
      continue
    }
    SubCurrency.push(<CurrencyLi key={i} data-index={i} onClick={(e) => {
      const selectIdx = parseInt(e.target.getAttribute('data-index'));
      setBaseCurrency(selectIdx);
    }}>{currencyList[i]}</CurrencyLi>)
  }
  
  return (
    <>
      <DropDown>
        <Base>{currencyList[baseCurrency]}<CaretDown icon={faCaretDown} /></Base>
        <UL>{SubCurrency}</UL>
      </DropDown>
    </>
  );
};

const UL = styled.ul`
padding: 0;
list-style: none;
`
const DropDown = styled(UL)`
width: 5em;
UL{
  background-color: gray;
  display: none;
}
&:hover UL{
  display: block;
}
`
const CurrencyLi = styled.li`
list-style: none;
text-align: center;
&:hover{
  background-color: rgba(1,1,1,0.3);
}
`
const Base = styled(CurrencyLi)`
border: solid 2px black;
padding-left: 5px;
text-align: left;
display: flex;
justify-content: space-between;
&:hover{
  background-color: white;
}
`
const CaretDown = styled(FontAwesomeIcon)`
padding-top: 1px;
padding-right: 5px;
`

export default CurrencyDropDown;
