import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div``;
const Select = styled.select``;

const Button = styled.button`
  font-weight: 600;
`;
const Alert = styled.div`
  color: red;
`;

const WireBarley = (props) => {

  const handleAlertOn = () => {
    setFlag(true);
  }

  const handleAlertOff = () => {
    setSendPrice(price * selected.exchange);
    setFlag(false);
  }
  
  useEffect( ()=>{

    let arr = [];
    let idx = 1;

    if(props.data !== undefined){

      for(let item of Object.keys(props.data.quotes)){
        if (item === "USDKRW" || item === "USDJPY" || item === "USDPHP"){
          arr.push({
            country:
              item === "USDKRW"
                ? "한국"
                : item === "USDJPY"
                ? "일본"
                : "필리핀",
            code: item.substring(3, Object.keys(props.data.quotes).length),
            exchange: props.data.quotes[item],
            idx: idx,
          });
          idx++;
        }
      }

      setMyData(arr);
      setSelected(arr[1]);

    }
  },[props.data])

  let [sendPrice, setSendPrice] = useState(0);
  let [price, setPrice] = useState(0);
  let [myData, setMyData] = useState([]);
  let [selected, setSelected] = useState({});
  let [flag, setFlag] = useState(false);

  return (
    <Container>
      <h1>환율 계산</h1>
      <p>송금국가: 미국(USD)</p>
      <p>
        수취국가:
        <Select
          onChange={(e) => {
            setSelected(myData[e.target.value]);
          }}
          value={selected.idx - 1}
        >
          {myData.map((item, index) => {
            return (
              <option value={index} key={index}>
                {item.country}({item.code})
              </option>
            );
          })}
        </Select>
      </p>
      <p>
        환율: {selected.exchange} {selected.code}/USD
      </p>
      <p>
        송금액:
        <input
          type="text"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        USD
      </p>
      <Button
        onClick={() => {
          price === "" || price <= 0 || price > 10000 || isNaN(price)
            ? handleAlertOn()
            : handleAlertOff()
        }}
      >
        Submit
      </Button>
      <p>
        수취금액은
        {`${sendPrice.toLocaleString("ko-KR", { maximumFractionDigits: 2 })}`}
        {selected.code} 입니다.
      </p>
      {flag ? <Alert>송금액이 바르지 않습니다.</Alert> : null}
    </Container>
  );
};

export default WireBarley;
