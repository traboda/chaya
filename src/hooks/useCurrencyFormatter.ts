import { useEffect, useRef } from 'react';

const useCurrencyFormatter = () => {
  const numberFormatter = useRef<(amount: number, currency?: string, decimals?: number) => string>(
    amount => `₹${amount.toString()}`,
  );
  useEffect(() => {
    numberFormatter.current = (amount, currency = 'INR', decimals = 0) =>
      new Intl.NumberFormat(window?.navigator?.language ?? 'en-IN', {
        style: 'currency',
        currency,
        minimumFractionDigits: decimals,
      }).format(amount);
  }, []);

  return numberFormatter.current;
};

export default useCurrencyFormatter;