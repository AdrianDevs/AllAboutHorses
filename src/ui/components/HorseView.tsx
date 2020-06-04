import React from 'react';
import { Horse } from 'domain/horses/types';
import { Typography } from '@material-ui/core';

interface Props {
  horse: Horse;
}

export const HorseView: React.FC<Props> = (props): JSX.Element => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {props.horse.name}
      </Typography>
    </div>
  );
};
