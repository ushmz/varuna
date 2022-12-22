import { useEffect, useRef } from "react";

const useInterval = (callback: () => void, delay: number) => {
  const callbackRef = useRef<() => void>(() => {});

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const interval = setInterval(() => callbackRef.current(), delay);
    return () => clearInterval(interval);
  }, [delay]);
};

export default useInterval;
