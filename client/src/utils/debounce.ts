function debounce(callback, wait: number, ...args) {
  let isDebounce;

  return function () {
    clearTimeout(isDebounce);
    isDebounce = setTimeout(() => callback.apply(this, args), wait);
  };
}

export default debounce;
