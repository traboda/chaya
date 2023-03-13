import { useEffect, useState } from 'react';

const Count = (min: number, max: number, speed: number) => {
  const [value, setValue] = useState(min);
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });

  useEffect(() => {
    let last = Date.now(), diff = 0;
    const loop = () => {
      diff += Date.now() - last;
      while (diff > speed) {
        diff -= speed;
        setValue(prevValue => {
          const newValue = prevValue + Math.ceil((max - min) / speed);
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

export default Count;
