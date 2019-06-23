import { ActionType } from '../actions.js';

export const setLocationSuccess = (locationCoords) => {
  console.log('setLocationSuccess locationCoords: ', locationCoords)
  return (
  {
    type: ActionType.SET_LOCATION_SUCCESS,
    payload: { locationCoords },
  }
)};
