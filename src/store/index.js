const store = {
  setLocalStorage(dataItem) {
    localStorage.setItem('dataItem', JSON.stringify(dataItem));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('dataItem'));
  },
};

export default store;
