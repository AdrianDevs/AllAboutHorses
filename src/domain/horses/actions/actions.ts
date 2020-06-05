import { Horse } from '../types';
import { HorseActionTypes } from './types';

export interface FetchHorsesStartAction {
  type: HorseActionTypes.fetchHorsesRequestStart;
  payload: null;
}

export interface FetchHorsesFinishedAction {
  type: HorseActionTypes.fetchHorsesRequestFinished;
  payload: Horse[];
}

export interface SetSelectedHorseAction {
  type: HorseActionTypes.setSelectedHorse;
  payload: string;
}

export const fetchHorsesStart = (): FetchHorsesStartAction => {
  return {
    type: HorseActionTypes.fetchHorsesRequestStart,
    payload: null,
  };
};

export const fetchHorsesFinished = (
  horses: Horse[]
): FetchHorsesFinishedAction => {
  return {
    type: HorseActionTypes.fetchHorsesRequestFinished,
    payload: horses,
  };
};

export const setSelectedHorseId = (horseId: string): SetSelectedHorseAction => {
  return {
    type: HorseActionTypes.setSelectedHorse,
    payload: horseId,
  };
};
