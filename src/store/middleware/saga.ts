import { all, fork } from 'redux-saga/effects';
import { watchFetchHorsesAsync } from 'domain/horses/saga';

export function* rootSaga() {
  yield all([fork(watchFetchHorsesAsync)]);
}
