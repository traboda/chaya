import { useEffect, useRef } from 'react';

const useCurrencyFormatter = (roundFrom: number = 1000) => {
  const numberFormatter = useRef<(number: number) => string>(
    number => number.toString(),
  );
  useEffect(() => {
    numberFormatter.current = number =>
      new Intl.NumberFormat(window?.navigator?.language ?? 'en-IN', {
        notation: number >= roundFrom ? 'compact' : 'standard',
      }).format(number);
  }, []);

  return numberFormatter.current;
};

export default useCurrencyFormatter;