import { Horse } from '../types';
import { HorseActionTypes, HorseAction } from '../actions';

export const horseReducer = (
  state: Horse[] = [],
  action: HorseAction
): Horse[] => {
  switch (action.type) {
    case HorseActionTypes.fetchHorsesRequestFinished:
      return action.payload;
    default:
      return state;
  }
};

export const horseSelectedReducer = (
  state: string = '',
  action: HorseAction
): string => {
  switch (action.type) {
    case HorseActionTypes.setSelectedHorse:
      return action.payload;
    default:
      return state;
  }
};
