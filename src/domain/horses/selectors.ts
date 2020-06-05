import { createSelector } from 'reselect';
import { StoreState } from 'domain/reducer';

const horsesSelector = (state: StoreState) => state.horses;
const selectedHorseIdSelector = (state: StoreState) => state.selectedHorseId;

export const horseSelector = createSelector(
  horsesSelector,
  selectedHorseIdSelector,
  (horses, horseId) => {
    for (const horse of horses) {
      if (horse.id === horseId) {
        return horse;
      }
    }
    // TODO raise error when no horse is matched instead of sending first horse
    return horses[0];
  }
);
