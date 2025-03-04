import { useEffect, useRef } from "react";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]); // Runs when `value` changes
  return ref.current;
};

export default usePrevious;