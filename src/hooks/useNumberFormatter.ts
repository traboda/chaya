'use client';
import { useCallback } from 'react';

const useNumberFormatter = (roundFrom?: number | null) => {
  const formatter = useCallback(
    (number: number, decimals: number = 0) => {
      const locale =
        typeof window !== 'undefined' ? (window.navigator?.language ?? 'en-IN') : 'en-IN';
      return new Intl.NumberFormat(locale, {
        notation: roundFrom ? (number >= roundFrom ? 'compact' : 'standard') : undefined,
        maximumFractionDigits: roundFrom
          ? number >= roundFrom
            ? Math.max(2, decimals)
            : decimals
          : decimals,
      }).format(number);
    },
    [roundFrom]
  );

  return formatter;
};

export default useNumberFormatter;
