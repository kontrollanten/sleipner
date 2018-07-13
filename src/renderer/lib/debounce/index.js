export default (func, time) => {
  let timeout;

  return function() {
    const args = arguments;
    const self = this;

    return new Promise(resolve => {
      clearTimeout(timeout);
      timeout = setTimeout(() => resolve(func(...args)), time);
    });
  };
};
