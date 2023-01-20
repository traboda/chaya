import React, { useEffect, useState } from 'react';
import style from './button.module.scss';
import clsx from 'clsx';

const useDebouncedRippleCleanUp = (rippleCount: number, duration: number, cleanUpFunction: () => void) => {
  useEffect(() => {
    let bounce: any = null;
    if (rippleCount > 0) {
      clearTimeout(bounce);

      bounce = setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounce);
      }, duration * 4);
    }

    return () => clearTimeout(bounce);
  }, [rippleCount, duration, cleanUpFunction]);
};

type RippleState = {
  x: number,
  y: number,
  size: number
};

const duration = 800;

const Ripple = () => {
  const [rippleArray, setRippleArray] = useState<RippleState[]>([]);

  useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
    setRippleArray([]);
  });

  const addRipple = (event: any) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
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
      <div className="dsr-absolute dsr-inset-0" onMouseDown={addRipple}>
          {rippleArray.length > 0 && rippleArray.map((ripple, index) => (
              <span
                  className={clsx([
                    style.animation,
                    'dsr-transform dsr-scale-[0.01] dsr-rounded-full dsr-absolute dsr-opacity-75 dsr-bg-white',
                  ])}
                  key={'span-' + index}
                  style={{
                    top: ripple.y, left: ripple.x,
                    width: ripple.size, height: ripple.size,
                    animationDuration: `${duration}ms`,
                  }}
              />
          ))}
      </div>
  );
};

export default Ripple;