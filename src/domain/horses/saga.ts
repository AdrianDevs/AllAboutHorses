import { call, put, takeLatest } from 'redux-saga/effects';
import { Horse } from './types';
import {
  HorseActionTypes,
  FetchHorsesFinishedAction,
  fetchHorsesFinished,
} from './actions/';
import * as api from './api';

function* fetchHorses() {
  const horses: Horse[] = yield call(api.fetchHorses);
  yield put(fetchHorsesFinished(horses));
}

export function* watchFetchHorsesAsync() {
  yield takeLatest(HorseActionTypes.fetchHorsesRequestStart, fetchHorses);
}
