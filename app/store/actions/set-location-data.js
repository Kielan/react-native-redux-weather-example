import { setLocationError } from './set-location-error';
import { setLocationRequest } from './set-location-request';
import { setLocationSuccess } from './set-location-success';

export const setLocationData = (coords) => (
  (dispatch) => new Promise(function(resolve, reject) {
    dispatch(setLocationRequest());
    console.log('set-location not calling')
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
