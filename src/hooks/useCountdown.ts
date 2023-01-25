import { useState } from 'react';

import useInterval from './useInterval';

interface UseCountdownInterface {
  // the date to count down to
  date: Date,
  allowNegative?: boolean,
  interval?: number
}
 
interface CountdownProperties {
  total: number,
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds: number,
  completed: boolean
}

interface CountdownHelpers {
  setDate: (date: Date) => void,
}

const useCountdown = ({
  date: initialDate, allowNegative = false, interval = 1000,
}: UseCountdownInterface): [CountdownProperties, CountdownHelpers] => {

  const [date, setDate] = useState<Date>(initialDate);

  const calculateDelta = (): CountdownProperties => {
    const now = Date.now();
    const timeLeft = new Date(date).getTime() - now;

    const total = Math.round(
      parseFloat(
        ((allowNegative ? timeLeft : Math.max(0, timeLeft)) / 1000).toFixed(2),
      ) * 1000,
    );

    const seconds = Math.abs(total) / 1000;

    return {
      total,
      days: Math.floor(seconds / (3600 * 24)),
      hours: Math.floor((seconds / 3600) % 24),
      minutes: Math.floor((seconds / 60) % 60),
      seconds: Math.floor(seconds % 60),
      milliseconds: Number(((seconds % 1) * 1000).toFixed()),
      completed: total <= 0,
    };

  };

  const [delta, setDelta] = useState<CountdownProperties>(calculateDelta());

  const tick = () => setDelta(calculateDelta());

  useInterval(tick, interval);

  return [delta, { setDate }];

};

export default useCountdown;