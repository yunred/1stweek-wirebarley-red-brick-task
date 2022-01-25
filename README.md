# 1주차 과제 와이어바알리-레드브릭 기업과제 환율 계산기

## [GO DEMO🚀](http://)

## MEMBER

| 팀장     | 팀원     | 팀원         | 팀원         |
| -------- | -------- | ------------ | ------------ |
| 신원규   | 김서윤   | 지연비       | 권영채       |
| 레드브릭 | 레드브릭 | 와이어바알리 | 와이어바알리 |

## 기능 구현 요구사항

### 공통

✔️ 환율정보는 https://currencylayer.com/의 무료 서비스를 이용해서 실시간으로 가져와야 합니다.

### 와이어바알리

✔️ 수취국가는 한국, 일본, 필리핀 세 군데 중 하나를 select box로 선택합니다.

✔️ 수취국가를 선택하면 아래 환율이 바뀌어나타나야 합니다.

✔️ Submit을 누르면 수취금액이 계산되어서 나와야 합니다.

✔️ 환율과 수취금액은 소숫점 2째자리까지, 3자리 이상 되면 콤마를 가운데 찍어 보여줍니다.

✔️ 수취금액 입력 오류시 팝업 메시지를 띄웁니다.

![wire](https://user-images.githubusercontent.com/84373490/151025363-fe482e5e-6d0f-4687-9380-086c57788812.gif)

### 레드브릭

✔️ 사용자가 숫자만 입력할 수 있어야 합니다. 1000 이상을 입력할 경우 자동적으로 “1,000”와 같이 변경되어야 합니다.

✔️ “USD” 드롭다운 메뉴에 제시된 통화는 USD,CAD,KRW, HKD,JPY,CNY 로 한정됩니다.

✔️ “USD” 드롭다운 메뉴를 “CAD”로 선택할 경우, 화면 예시에 제시된 탭 “CAD”는 제거되고 “USD”로 생성되어야 합니다.

✔️ 사용자의 수치 입력 혹은 드롭다운 메뉴를 이용한 통화 변경시 변경될 환율과 기준일 정보는 동기화 되어 변경되어야 합니다.

✔️ 기준일의 날짜 포맷은 반드시 예시에 표기된 내용에 따라야 합니다.

![red](https://user-images.githubusercontent.com/84373490/150989855-d87d0fc8-7817-4a4c-8c99-9cf5ae229f33.gif)

## 이슈 정리

### Data Fetching

HTTP 통신을 하는 주체는 각각의 계산기 컴포넌트가 아닌 최상위 계층의 컴포넌트에서 한번에 다뤄야 자연스럽다고 생각했습니다. 둘을 감싸는 Container 컴포넌트를 하나 더 만들기 보다는 Router.js 파일에서 HTTP 통신으로 API에서 받아올 데이터를 state로 만들고, 각각의 계산기 컴포넌트에 props로 전달하는 방식을 선택하였습니다.

```jsx
//Router.js

<Routes>
<Route path="/" element={<WireBarley data={ExchangeData} />} />
<Route path="/RedBrick" element={<RedBrick data=
{ExchangeData} />} />
<Routes/>
```

### API KEY 사용량 초과

![props-data](https://user-images.githubusercontent.com/84373490/150989839-01b62665-5150-411c-9752-2c544dc79b59.PNG)

API 사용 제한이 월 250회 였고, 제한 사용량을 초과하면 화면이 렌더링 되지 않았습니다. 이에 localStorage에 mock Data를 저장하는 방법을 고안하였습니다.

![localStorage](https://user-images.githubusercontent.com/84373490/151015086-55d45aa2-a383-41f3-a9cb-8f34fa330a6e.jpg)

방법은 다음과 같습니다.

1. 초기 데이터 수신시 localStorage가 비어있을 경우 일단 mock Data를 저장한다.

```jsx
//Router.js

const [ExchangeData, SetExchangeData] = useState(mockupData);

if (!store.getLocalStorage()) {
  // localData can't find
  store.setLocalStorage(mockupData);
}
```

2. localStorage에 mock Data가 있고, timestamp가 24시간 이내라면 mock Data를 state에 가져와 갱신한다.

```jsx
const [ExchangeData, SetExchangeData] = useState(mockupData);

if (store.getLocalStorage()) { //localData exist

  if(24H > timestamp){ // data in inDated
    SetExchangeData(store.getLocalStorage());
  }
```

3. localStorage에 mock Data가 있고, timestamp에 24시간 이상 차이나면 갱신을 시도한다.

```jsx
const [ExchangeData, SetExchangeData] = useState(mockupData);

if (store.getLocalStorage()) { //localData exist

  if(24H < timestamp){ // data in outDated
    await UseFetchExchangeRate()
  }
```

4.  갱신이 성공하면 localStorage와 state를 갱신하고, 실패하면 userInterval로 24시간 이후에 다시 시도한다.

```jsx
await UseFetchExchangeRate().then((data) => (fetchedData = data));
if (fetchedData.success) {
  store.setLocalStorage(fetchedData);
  SetExchangeData(store.getLocalStorage());
}
```

[Router.js🚀](https://github.com/PreOnBoarding-Team-16/1stweek-wirebarley-red-brick-task/blob/main/src/Router.js)