'use client';

import { useEffect, useRef } from 'react';

const useCurrencyFormatter = (roundFrom: number = 1000) => {
  const numberFormatter = useRef<(number: number, decimals?: number) => string>(
    (number, decimals = 0) => number.toFixed(decimals),
  );
  useEffect(() => {
    numberFormatter.current = (number, decimals = 0) =>
      new Intl.NumberFormat(window?.navigator?.language ?? 'en-IN', {
        notation: number >= roundFrom ? 'compact' : 'standard',
        maximumFractionDigits: decimals,
      }).format(number);
  }, []);

  return numberFormatter.current;
};

export default useCurrencyFormatter;