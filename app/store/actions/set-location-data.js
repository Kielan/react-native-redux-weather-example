import { ActionType } from '../actions.js';

export const setLocationData = (coords) => (
  (dispatch) => new Promise(function(resolve, reject) {
    dispatch(setLocationRequest());
    return Promise.resolve(dispatch(setLocationSuccess(coords)))
    .then(() => {
      resolve(coords)
    })
    .catch((err) => {
      console.log('setLocationRequest err ', err)
      dispatch(setLocationError())
    });
  })
)

export const setLocationError = () => (
  {
    type: ActionType.SET_LOCATION_ERROR,
    payload: { error: true },
  }
);

export const setLocationRequest = () => (
  {
    type: ActionType.SELECT_LOCATION_REQUEST,
    payload: { isLoading: true },
  }
);


export const setLocationSuccess = (locationCoords) => (
  {
    type: ActionType.SET_LOCATION_SUCCESS,
    payload: { locationCoords },
  }
);
