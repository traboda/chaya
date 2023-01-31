import { useState } from 'react';

import useInterval from './useInterval';

const Count = (props: number) => {
  const value = props;
  const end = value >= 1000000000 ? value / 1000000000 : value >= 1000000 ? value / 1000000 : value >= 1000 ? value / 1000 : value;
  const initialCount = end >= 1000000000 ? end - 100 : end >= 100 ? end * 97 / 100 : 0;
  const [count, setCount] = useState(initialCount);
  const suffix = value > 1000000000 ? 'B' : value > 1000000 ? 'M' : value > 1000 ? 'K' : '';
  let interval = 10;
  let time = 0;
  useInterval(() => {
    if (count < end) {
      time++;
      setCount(count + Math.min(interval / 10 * Math.pow(1.0, time)));
    }
  }, 50 - time);

  return (
    [count.toFixed(1), suffix]
  );
};

export default Count;