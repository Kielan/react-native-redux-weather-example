import { ActionType } from '../actions';

export const setLocationRequest = () => (
  {
    type: ActionType.SELECT_LOCATION_REQUEST,
    payload: { isLoading: true },
  }
);
