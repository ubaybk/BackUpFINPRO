import { useEffect } from "react";

const useIntersectionObserver = (callback, options = {}, targetRef) => {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    const target = targetRef.current;
    if (target) {
      observer.observe(target);
    }

    // Cleanup when component unmounts or dependencies change
    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [callback, options, targetRef]);
};

export default useIntersectionObserver;
