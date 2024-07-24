import { useEffect, useRef, useState } from 'react';

function useScrollbarAndScrollState<T extends HTMLElement>(
  isModalOpen?: boolean,
): [React.RefObject<T>, boolean, boolean] {
  const ref = useRef<T>(null);
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  let scrollTimeout: NodeJS.Timeout | null = null;

  const checkScroll = () => {
    const element = ref.current;
    if (element) {
      const hasVerticalScrollbar = element.scrollHeight > element.clientHeight;
      const hasHorizontalScrollbar = element.scrollWidth > element.clientWidth;
      setIsScrollbarVisible(hasVerticalScrollbar || hasHorizontalScrollbar);
    }
  };

  const handleScroll = () => {
    setIsScrolling(true);

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => {
      setIsScrolling(false);
    }, 50);
  };

  useEffect(() => {
    const element = ref.current;

    const handleCheckScroll = () => {
      requestAnimationFrame(() => {
        checkScroll();
      });
    };

    if (element) {
      element.addEventListener('scroll', handleScroll);
    }

    if (isModalOpen) {
      handleCheckScroll();
    }

    window.addEventListener('resize', handleCheckScroll);

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleCheckScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [isModalOpen, ref.current]);

  return [ref, isScrollbarVisible, isScrolling];
}

export default useScrollbarAndScrollState;
