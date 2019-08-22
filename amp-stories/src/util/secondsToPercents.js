export const secondsToPercents = (keyframes) => {
  const timestamps = keyframes.match(/(\d+\.?\d*)s/g);
  const totalDuration = parseFloat(timestamps[timestamps.length - 1]);
  let normalizeKeyframes = keyframes;
  timestamps.forEach((stamp) => {
    const stampNum = parseFloat(stamp);
    const percent = stampNum === 0 ? 0 : (stampNum / totalDuration) * 100;

    normalizeKeyframes = normalizeKeyframes.replace(
      `${stampNum}s`,
      `${percent}%`,
    );
  });
  return normalizeKeyframes;
};
