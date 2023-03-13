import { useEffect, useState } from 'react';

const useCountUp = (min: number, max: number, duration: number) => {
  const [value, setValue] = useState(min);
  const fps = duration / 60 ;
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });

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
  return (
    [formatter.format(value)]
  );
};

export default useCountUp;
