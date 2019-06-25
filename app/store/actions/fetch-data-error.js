import { ActionType } from '../actions.js';

export const fetchDataError = () => (
  {
    type: ActionType.FETCH_DATA_ERROR,
    payload: { error: true },
  }
);
