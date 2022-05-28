const useScroller = () => {
  const scrollTop = () => window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  const scrollBottom = () => window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });

  return {
    scrollTop,
    scrollBottom,
  };
};

export default useScroller;
