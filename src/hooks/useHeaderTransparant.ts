import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useHeaderTransparent = () => {
  const location = useLocation();
  const [isTransparent, setIsTransparent] = useState(false);

  useEffect(() => {
    setIsTransparent(location.pathname === '/');
  }, [location.pathname]);

  return isTransparent;
};

export default useHeaderTransparent;
