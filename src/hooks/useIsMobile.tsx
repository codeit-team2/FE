import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const isMobileQuery = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

  return isMobile;
}