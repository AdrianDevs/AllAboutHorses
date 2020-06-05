import React from 'react';
import {
  Button,
  Box,
  makeStyles,
  Theme,
  createStyles,
  Typography,
} from '@material-ui/core';
import { setSelectedHorseId } from 'domain/horses/actions';
import { useDispatch, useSelector } from 'react-redux';
import { horseSelector } from 'domain/horses/selectors';

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
    boxDetails: {
      marginTop: theme.spacing(4),
    },
  })
);

export const HorseView: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const horse = useSelector(horseSelector);

  const backClicked = () => {
    dispatch(setSelectedHorseId(''));
  };

  return (
    <Box className={classes.boxRoot}>
      <Button
        variant="contained"
        color="primary"
        component="span"
        onClick={backClicked}
      >
        Go back
      </Button>
      <Box className={classes.boxDetails}>
        <Typography variant="h6" gutterBottom>
          {`Name: ${horse.name}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`Favourite food: ${horse.profile.favouriteFood}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`Height: ${horse.profile.physical.height}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`Weight: ${horse.profile.physical.weight}`}
        </Typography>
      </Box>
    </Box>
  );
};
