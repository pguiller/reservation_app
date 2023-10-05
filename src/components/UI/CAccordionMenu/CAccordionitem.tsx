import React, { useCallback } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store/store';
import { logoutlAsync } from 'src/store/auth/authAsync';
import { leftMenuOpened } from 'src/store/navigation/navigationSlice';
import { AccordionMenuProps } from '../types';
import { Stage } from 'src/utils/types/MenuStage';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CAccordion = <T extends Stage | string>({
  url,
  expanded,
  expandFunction,
  name,
  items,
}: AccordionMenuProps<T>) => {
  const BASE_URL = `/${name}/`;
  const dispatch = useDispatch<AppDispatch>();

  const getMenuItemUrl = (item: string | Stage) => {
    if ((item as Stage).redirect) {
      return window.location.href;
    }
    if (typeof item === 'string') {
      return `${url}/${item}`;
    } else if ('id' in item) {
      const stageUrl = 'url' in item ? item.url : '';

      return `${BASE_URL}${stageUrl}`;
    } else {
      throw new Error('Item must be either a string or an object with an id');
    }
  };

  const handleItemClicked = useCallback(
    (item: Stage): void => {
      if (item.redirect) {
        window.open(`${item.url}`, '_blank');
      }
      if (typeof item === 'string' && item === 'Logout') {
        dispatch(logoutlAsync());
      }
      dispatch(leftMenuOpened(false));
    },
    [dispatch]
  );

  return (
    <Accordion expanded={expanded === name} onChange={expandFunction(name)}>
      <AccordionSummary
        aria-controls={`${name}-content`}
        id={`${name}-header`}
        expandIcon={<ExpandMoreIcon />}
      >
        {name}
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {items.map((item, index) => (
            <ListItem key={`item-${index}`}>
              <ListItemButton
                component={Link}
                to={getMenuItemUrl(item)}
                key={index}
                onClick={() => handleItemClicked(item as Stage)}
              >
                {typeof item === 'string' ? item : item.name}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default CAccordion;
