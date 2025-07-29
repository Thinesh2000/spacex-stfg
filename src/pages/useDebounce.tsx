import { useEffect, useState } from "react";

/**
 * Debounces a value by a specified delay in milliseconds.
 *
 * @param value - The value to debounce (string, number, etc.)
 * @param delay - Delay in ms (default: 500)
 * @returns The debounced value
 */
const useDebounce = <T,>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
