import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function useIsMobile() {
  const isMobileQuery = useMediaQuery({ maxWidth: 767 });
  const [isMobile, setIsMobile] = useState(isMobileQuery);

  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

  return isMobile;
}
