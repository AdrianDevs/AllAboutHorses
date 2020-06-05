import { combineReducers } from 'redux';
import { Horse } from './horses/types';
import { horseReducer, horseSelectedReducer } from './horses/reducers';

export interface StoreState {
  horses: Horse[];
  selectedHorseId: string;
}

export const rootReducer = combineReducers({
  horses: horseReducer,
  selectedHorseId: horseSelectedReducer,
});
