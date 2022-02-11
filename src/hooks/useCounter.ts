import {useState} from "react";
import useInterval from './useInterval'

interface UseCountdownType {
  initialValue?: number
  interval?: number
  isIncrement?: boolean
}

interface CountdownHelpers {
  start: () => void
  stop: () => void
  reset: () => void
}

const useCountdown = ({ initialValue = 0, interval = 1000, isIncrement }: UseCountdownType): [number, CountdownHelpers] => {

  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(x => x + 1);
  const decrement = () => setCount(x => x - 1);

  const [isCounting, setCounting] = useState(true);

  const start = () => setCounting(true);
  const stop = () => setCounting(false);

  const reset = () => {
    stop();
    setCount(initialValue);
  };

  useInterval(isIncrement ? increment : decrement, isCounting ? interval : null);

  return [count, { start, stop, reset }];

}

export default useCountdown