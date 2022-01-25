async function UseFetchExchangeRate() {
  try {
    const response = await fetch(
      'http://api.currencylayer.com/live?access_key=c3496e3b72c4325a0fd4ee717b12ff21&format=1'
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default UseFetchExchangeRate;
