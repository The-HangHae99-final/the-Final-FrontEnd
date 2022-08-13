import { useEffect, useState } from "react";

// isMounted = boolean 값
// unmountDelay = transition 값
const useMountTransition = (isMounted, unmountDelay) => {
  const [hasTransitionedIn, setHasTransitionedIn] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isMounted && !hasTransitionedIn) {
      setHasTransitionedIn(true);
    } else if (!isMounted && hasTransitionedIn) {
      timeoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [unmountDelay, isMounted, hasTransitionedIn]);

  // isMounted가 true 면 true를 반환
  // isMounted가 false 면 딜레이 후에 false 반환
  return hasTransitionedIn;
};

export default useMountTransition;
