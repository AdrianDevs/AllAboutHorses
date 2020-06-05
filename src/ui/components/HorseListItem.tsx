import React from 'react';
import { Horse } from 'domain/horses/types';
import { Typography } from '@material-ui/core';

interface Props {
  horse: Horse;
}

export const HorseView: React.FC<Props> = (props): JSX.Element => {
  const horse = props.horse as Horse;

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {horse.name}
      </Typography>
    </div>
  );
};
