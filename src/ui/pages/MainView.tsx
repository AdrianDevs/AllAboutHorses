import React from 'react';
import { makeStyles, Theme, createStyles, Box } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { HorseListView } from './HorseListView';
import { HorseView } from './HorseView';
import { useSelector } from 'react-redux';
import { StoreState } from 'domain/reducer';

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
  })
);

const _MainView: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const selectedHorseId: string = useSelector(
    (state: StoreState) => state.selectedHorseId
  );

  const SubRouteComponent = selectedHorseId ? HorseView : HorseListView;

  return (
    <div>
      <Box className={classes.boxRoot}>
        <SubRouteComponent />
      </Box>
    </div>
  );
};

export const MainView = withRouter(_MainView);
