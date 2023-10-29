'use client';
import { useState } from 'react';

import useInterval from './useInterval';
 
interface UseCounterType {
  initialValue?: number
  interval?: number
  isIncrement?: boolean,
  allowNegative?: boolean
}

interface CounterHelpers {
  start: () => void
  stop: () => void
  reset: () => void
}

const useCounter = ({ initialValue = 0, interval = 1000, isIncrement = true, allowNegative = true }: UseCounterType): [number, CounterHelpers] => {

  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(x => x + 1);
  const decrement = () => (count > 0 || allowNegative) ? setCount(x => x - 1) : null;

  const [isCounting, setCounting] = useState(true);

  const start = () => setCounting(true);
  const stop = () => setCounting(false);

  const reset = () => {
    stop();
    setCount(initialValue);
  };

  useInterval(isIncrement ? increment : decrement, isCounting ? interval : null);

  return [count, { start, stop, reset }];

};

export default useCounter;