export const numerify = (item) => {
  if (typeof item === 'number') {
    return `${item}px`;
  } else if (typeof item === 'string') {
    return item;
  }
  return 'auto';
};
