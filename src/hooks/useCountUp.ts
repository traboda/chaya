import { useEffect, useState } from 'react';

import useNumberFormatter from './useNumberFormatter';

const useCountUp = (min: number, max: number, duration: number = 2000, roundFrom = 1000) => {
  const [value, setValue] = useState(min);
  const fps = duration / 60;
  const formatter = useNumberFormatter(roundFrom);

  useEffect(() => {
    let last = Date.now(), diff = 0;
    const loop = () => {
      diff += Date.now() - last;
      while (diff > fps) {
        diff -= fps;
        setValue(prevValue => {
          const newValue = prevValue + Math.ceil((max - min) / fps);
          return Math.min(newValue, max);
        });
      }
      last = Date.now();
      if (value < max) requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }, []);
  
  return formatter(value);
};

export default useCountUp;
