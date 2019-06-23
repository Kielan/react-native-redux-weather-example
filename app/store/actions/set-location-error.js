import { ActionType } from '../actions.js';

export const setLocationError = () => (
  {
    type: ActionType.SET_LOCATION_ERROR,
    payload: { error: true },
  }
);
