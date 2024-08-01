import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function useIsTablet() {
  const isTabletQuery = useMediaQuery({ maxWidth: 1024 });
  const [isTablet, setIsTablet] = useState(isTabletQuery);

  useEffect(() => {
    setIsTablet(isTabletQuery);
  }, [isTabletQuery]);

  return isTablet;
}
