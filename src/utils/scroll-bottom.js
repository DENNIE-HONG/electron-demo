function scrollBottom (container, threshold = 0) {
  let containerH = container.scrollHeight;
  if (container === window || container === document) {
    containerH = document.documentElement.scrollHeight;
  }
  const scrollH = containerH - container.clientHeight;
  if (scrollH - container.scrollTop <= threshold) {
    return true;
  }
}
export default scrollBottom;
