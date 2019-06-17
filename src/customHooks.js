import { useEffect, useRef, useState } from "react";

/**
 * Custom Hook to execute a callback every given interval.
 */
export function useInterval(callback, delay) {
  /**
   * Stores the callback in a ref to allow persistance between renders.
   */
  const savedCallback = useRef();

  /**
   * Set the callack ref to callback function of each render.
   *
   * The callback function will be redefined each render,
   * but we have captured the callback when this component mounts.
   */
  useEffect(() => {
    savedCallback.current = callback;
  });

  /**
   * Call the function every interval.
   *
   * Restart the interval if the delay value changes.
   *
   * If the component unmounts, cleanup the interval.
   */
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

/**
 * Custom hook to determine if a key is being pressed down.
 *
 * @param {char} target - The target key to check for.
 */
export function useKeyPress(target) {
  /**
   * Hold the state of the key press in state.
   */
  const [keyDown, setKeyDown] = useState(false);

  /**
   * Toggle the key down and up states.
   */
  const handleDown = ({ key }) => {
    if (key === target) setKeyDown(true);
  };

  const handleUp = ({ key }) => {
    if (key === target) setKeyDown(false);
  };

  /**
   * Define the keypress events with a suitable cleanup function.
   */
  useEffect(() => {
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, []);

  return keyDown;
}

/**
 * Returns an object from an array of objects, cycling through them over time
 * defined by a given interval.
 */
export function useCycle(objArray, objDefault, interval) {
  /**
   * Define index to hold a reference to the current object.
   */
  const [index, setIndex] = useState(0);

  /**
   * Update the index over time.
   */
  useInterval(() => {
    setIndex(objArray.length > 0 ? (index + 1) % objArray.length : 0);
  }, interval);

  /**
   * Return the object of index in the array, else the default object if the array is empty.
   */
  return objArray.length > 0 ? objArray[index] : objDefault;
}
