import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div``;
const Select = styled.select``;
const Button = styled.button`
  font-weight: 600;
  height: 40px;
  width: 100px;
`;
const AlertButton = styled.button`
`;

const WireBarley = (props) => {
  const [sendPrice, setSendPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [myData, setMyData] = useState([]);
  const [selected, setSelected] = useState(0);
  const [exchange, setExchange] = useState(0);

  const handleAlertOn = () => {
    <AlertButton type="submit" onClick={alert("송금액이 바르지 않습니다!")} />;
  };

  const handleAlertOff = () => {
    setSendPrice(price * selected.exchange);
  };

  const handleSelect = (e) => {
    setSelected(myData[e.target.value]);
    setExchange(myData[e.target.value].exchange);
  };

  useEffect(() => {
    let arr = [];
    let idx = 0;

    if (props.data !== undefined) {
      for (let item of Object.keys(props.data.quotes)) {
        if (item === "USDKRW" || item === "USDJPY" || item === "USDPHP") {
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
      setExchange(arr[1].exchange);
    }
  }, [props.data]);

  return (
    <Container>
      <h1>환율 계산</h1>
      <p>송금국가: 미국(USD)</p>
      <p>
        수취국가:
        <Select
          onChange={(e) => {
            handleSelect(e)
          }}
          value={selected.idx}
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
        환율:
        {
          exchange.toLocaleString("ko-KR", { maximumFractionDigits: 2 })
        }
        {selected.code}/USD
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
            : handleAlertOff();
        }}
      >
        Submit
      </Button>
      <p>
        수취금액은
        {sendPrice !== 0 ? `${sendPrice.toFixed(2).toLocaleString("ko-KR", { maximumFractionDigits: 2 })}` : 0}
        {selected.code} 입니다.
      </p>
    </Container>
  );
};

export default WireBarley;
