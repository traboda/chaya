'use client';
import { useEffect, useRef } from 'react';

const useNumberFormatter = (roundFrom?: number | null) => {
  const numberFormatter = useRef<(number: number, decimals?: number) => string>(
    (number, decimals = 0) => number.toFixed(decimals),
  );
  useEffect(() => {
    numberFormatter.current = (number, decimals = 0) =>
      new Intl.NumberFormat(window?.navigator?.language ?? 'en-IN', {
        notation: roundFrom ? number >= roundFrom ? 'compact' : 'standard' : undefined,
        maximumFractionDigits: roundFrom ? number >= roundFrom ? Math.max(2, decimals) : decimals : decimals,
      }).format(number);
  }, []);

  return numberFormatter.current;
};

export default useNumberFormatter;