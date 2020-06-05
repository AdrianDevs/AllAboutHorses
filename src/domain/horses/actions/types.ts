import {
  FetchHorsesStartAction,
  FetchHorsesFinishedAction,
  SetSelectedHorseAction,
} from './actions';

export enum HorseActionTypes {
  fetchHorsesRequestStart = 'action_horses_fetch_horse_request_start',
  fetchHorsesRequestFinished = 'action_horses_fetch_horse_request_finished',
  setSelectedHorse = 'action_horses_set_selected_horse',
}
export type HorseAction =
  | FetchHorsesStartAction
  | FetchHorsesFinishedAction
  | SetSelectedHorseAction;
