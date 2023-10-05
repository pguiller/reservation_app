import { useState } from 'react';

import {
  AnchorEls,
  HandleCloseMenu,
  HandleOpenMenu,
  UseMenuReturn,
} from './types';

function useMenuAnchors(): UseMenuReturn {
  const [anchorEls, setAnchorEls] = useState<AnchorEls>({
    menu1: null,
  });

  const handleOpenMenu: HandleOpenMenu = (event, menu) => {
    setAnchorEls((prevAnchorEls) => ({
      ...prevAnchorEls,
      [menu]: event.currentTarget,
    }));
  };

  const handleCloseMenu: HandleCloseMenu = (menu) => {
    setAnchorEls((prevAnchorEls) => ({
      ...prevAnchorEls,
      [menu]: null,
    }));
  };

  return {
    anchorEls,
    handleOpenMenu,
    handleCloseMenu,
  };
}

export default useMenuAnchors;
