import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ExChangeRateDisPlay = (props) => {
    const baseCurrency = props.base;
    const amount = props.amount;
    const time = props.time;
    const quotesdata = props.quotesdata;
    const currencyList = ['USD', 'CAD', 'KRW', 'HKD', 'JPY', 'CNY'];
    const [selectedCurrency , setSelectedCurrency] = useState(baseCurrency == currencyList.length? 0: baseCurrency + 1);
    useEffect(()=>{
      setSelectedCurrency(baseCurrency == 0? 1: 0)
    }, [baseCurrency]);

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
        <Display>
          <DisplaySelector>
              {selectList}
          </DisplaySelector>
          <InfoDiv>
            <span>{`${currencyList[selectedCurrency]} ${amount? baseCurrency === 0? amount*quotesdata[selectedCurrency]: amount/quotesdata[baseCurrency]*quotesdata[selectedCurrency] : ''}`}</span>
          </InfoDiv>
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
  width: fit-content;
  `
  const InfoDiv = styled.div`
  border: solid 3px rgba(1,1,1,1);
  border-top: none;
  height: 15em;
  `
  
  export default ExChangeRateDisPlay;