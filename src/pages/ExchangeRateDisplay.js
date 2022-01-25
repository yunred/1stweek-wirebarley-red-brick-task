import React, { useState } from 'react';
import styled from 'styled-components';

const ExChangeRateDisPlay = (props) => {
    const baseCurrency = props.base;
    const setBaseCurrency = props.baseSetter;
    const [selectedCurrency , setSelectedCurrency] = useState(1);
    const currencyList = ['USD', 'CAD', 'KRW', 'HKD', 'JPY', 'CNY'];
    const selectList = []
    for(let i = 0; i < currencyList.length; i ++){
        if(i === baseCurrency){
            continue
        }
        if(i === selectedCurrency){
            selectList.push(
                <LI selected={true} key={i} data-index= {i}>{currencyList[i]}</LI>
            )    
            continue
        }
        selectList.push(
            <LI key={i} data-index= {i} onClick={(e) => setSelectedCurrency(parseInt(e.target.getAttribute('data-index')))}>{currencyList[i]}</LI>
        )
    }
    return (
      <>
        <DisplaySelector>
            {selectList}
        </DisplaySelector>
        <Display>

        </Display>
           
      </>
    );
  };

  const LI = styled.li`
  list-style: none;
  width: 3em;
  text-align: center;
  border-right: solid 3px rgba(1,1,1,1);
  border-bottom: ${props => props.selected ? 'none' : 'solid 3px rgba(1,1,1,1)'};
  `
  const UL = styled.ul`
  margin: 0;
  padding: 0;
  `
const DisplaySelector = styled(UL)`
    border: solid 3px rgba(1,1,1,1);
    border-right: none;
    border-bottom: none;
    display: flex;
    width: fit-content;
    `
  const Display = styled.div`
  
  `
  
  export default ExChangeRateDisPlay;