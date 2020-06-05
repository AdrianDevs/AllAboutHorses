import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Box,
  List,
  ListItem,
} from '@material-ui/core';
import { Horse } from 'domain/horses/types';
import { HorseView } from 'ui/components/HorseListItem';
import { localisedStrings } from 'lib/localisation';
import { fetchHorsesStart, setSelectedHorseId } from 'domain/horses/actions';
import { StoreState } from 'domain/reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      padding: 0,
    },
  })
);

export const HorseListView: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const horses: Horse[] = useSelector((state: StoreState) => state.horses);

  useEffect(() => {
    dispatch(fetchHorsesStart());
  }, [dispatch]);

  const handleHorseClicked = (index: number, horse: Horse) => () => {
    dispatch(setSelectedHorseId(horse.id));
  };

  const horseList = () => (
    <List disablePadding>
      {horses.map((horse, index) => (
        <ListItem
          className={classes.listItem}
          button
          key={index + ' - ' + horse.id}
          onClick={handleHorseClicked(index, horse)}
        >
          <HorseView horse={horse} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {localisedStrings.horseListTitle}
      </Typography>
      {horseList()}
    </Box>
  );
};
