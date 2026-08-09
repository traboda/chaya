import React, { MouseEvent, useEffect, useState } from 'react';

import clsx from 'clsx';

import style from './Button.module.scss';

const useDebouncedRippleCleanUp = (
  rippleCount: number,
  duration: number,
  cleanUpFunction: () => void
) => {
  useEffect(() => {
    let bounce: NodeJS.Timeout | undefined = undefined;
    if (rippleCount > 0) {
      clearTimeout(bounce);

      bounce = setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounce);
      }, duration);
    }

    return () => clearTimeout(bounce);
  }, [rippleCount, duration, cleanUpFunction]);
};

type RippleState = {
  x: number;
  y: number;
  size: number;
};

const duration = 600;

const Ripple = () => {
  const [rippleArray, setRippleArray] = useState<RippleState[]>([]);

  useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
    setRippleArray([]);
  });

  const addRipple = (event: MouseEvent) => {
    const rippleContainer = event.currentTarget?.getBoundingClientRect();
    const size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height;
    const x = event.pageX - rippleContainer.x - size / 2;
    const y = event.pageY - rippleContainer.y - size / 2;
    const newRipple = { x, y, size };
    setRippleArray([...rippleArray, newRipple]);
  };

  return (
    <span className="absolute inset-0" onMouseDown={addRipple}>
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => (
          <span
            className={clsx([
              style.animation,
              'absolute scale-[0.01] transform rounded-full bg-white opacity-75',
            ])}
            key={'span-' + index}
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
              animationDuration: `${duration}ms`,
            }}
          />
        ))}
    </span>
  );
};

export default Ripple;
