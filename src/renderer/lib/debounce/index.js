export default (func, time) => {
  let timeout;

  return function() {
    const args = arguments;

    return new Promise(resolve => {
      clearTimeout(timeout);
      timeout = setTimeout(() => resolve(func(...args)), time);
    });
  };
};
