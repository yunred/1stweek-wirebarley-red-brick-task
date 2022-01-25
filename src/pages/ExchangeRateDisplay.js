import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ExChangeRateDisPlay = (props) => {
    const baseCurrency = props.base;
    const amount = props.amount;
    const time = props.time;
    console.log(time);
    const quotesdata = props.quotesdata;
    const currencyList = ['USD', 'CAD', 'KRW', 'HKD', 'JPY', 'CNY'];
    const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const [selectedCurrency , setSelectedCurrency] = useState(baseCurrency === currencyList.length? 0: baseCurrency + 1);
    useEffect(()=>{
      setSelectedCurrency(baseCurrency === 0? 1: 0)
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
            <Exchanged><span style={{"marginRight":"5px"}}>{currencyList[selectedCurrency]}</span> <span>{amount? baseCurrency === 0? (amount*quotesdata[selectedCurrency]).toFixed(2): (amount/quotesdata[baseCurrency]*quotesdata[selectedCurrency]).toFixed(2) : ''}</span></Exchanged>
            <Time>기준일 :<br/>
            {`${time.getUTCFullYear()}-${monthList[time.getUTCMonth() - 1]}-${time.getDate()>10? time.getDate(): `0${time.getDate()}`}`}</Time>
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
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  `
   const Exchanged = styled.span`
   margin-top: 1rem;
   padding-left: 1rem;
   font-weight: 700;
   font-size: 1.2em;
   box-sizing: border-box;
   display: flex;
   flex-wrap: wrap;
   `
  const InfoDiv = styled.div`
  border: solid 3px rgba(1,1,1,1);
  border-top: none;
  height: 15em;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  ${Exchanged}{
    width:calc(12em);
  }
  `
  
 
  
  const Time = styled.span`
  font-size: 0.9rem;
  font-weight: 700;
  padding-left: 1rem;
  margin-top: 1rem;
  `

  export default ExChangeRateDisPlay;