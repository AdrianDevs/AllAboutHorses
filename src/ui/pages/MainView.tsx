import React, { useEffect, useState } from 'react';
import {
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Box,
  List,
  ListItem,
  TextField,
} from '@material-ui/core';
import { Horse } from 'domain/horses/types';
import { HorseView } from 'ui/components/HorseView';
import * as api from '../../domain/horses/api';
import { localisedStrings } from 'lib/localisation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boxRoot: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'center',
      padding: theme.spacing(4),
      [theme.breakpoints.down('sm')]: {
        alignItems: 'flex-start',
        padding: theme.spacing(2),
      },
    },
    listItem: {
      padding: 0,
    },
  })
);

export const MainView: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const [horses, setHorses] = useState<Horse[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      const allHorses = await api.fetchHorses();
      setHorses(allHorses);
    };
    void fetchAll();
  }, []);

  const handleHorseClicked = (index: number, horse: Horse) => () => {
    // TODO Handle horse clicked
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
    <div>
      <Box className={classes.boxRoot}>
        <Typography variant="h4" gutterBottom>
          {localisedStrings.horseListTitle}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {localisedStrings.horseListSubtitle}
        </Typography>
        <TextField
          label={'label'}
          placeholder={'placeholder'}
          required
          fullWidth
        />
        {horseList()}
      </Box>
    </div>
  );
};
