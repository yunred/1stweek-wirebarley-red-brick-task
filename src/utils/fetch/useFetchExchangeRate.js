async function UseFetchExchangeRate() {
  try {
    const response = await fetch(
      'http://api.currencylayer.com/live?access_key=349cb4fb4630e17e03823212983735df&format=1'
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default UseFetchExchangeRate;
