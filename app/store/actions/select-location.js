import { fetchData } from './fetch-data';
import { fetchWeatherData } from '../../services/http-requests';
import { setLocationData } from './set-location-data';
import { setLocationSuccess } from './set-location-success';
import { ActionType } from '../actions';

export const selectLocation = (location) => (
  (dispatch) => {
    dispatch(selectLocationRequest());
    return new Promise.resolve(dispatch(setLocationSuccess(location.coords)))
//        .then(() => setLocationData(coords))
//        .then((weatherInfo) => fetchData({name: location.name, ...weatherInfo}))
      .then(() => fetchWeatherData(location.coords))
      .then((fullWeatherInfo) => {
        dispatch(selectLocationSuccess({fullWeatherInfo: fullWeatherInfo}))
      })
      .catch((err) => {
        dispatch(selectLocationError())
      });
  }
);

export const selectLocationError = () => (
  {
    type: ActionType.SELECT_LOCATION_ERROR,
    payload: { error: true },
  }
);

export const selectLocationRequest = () => (
  {
    type: ActionType.SELECT_LOCATION_REQUEST,
    payload: { isLoading: true },
  }
);

export const selectLocationSuccess = (weatherInfo) => (
  {
    type: ActionType.SELECT_LOCATION_SUCCESS,
    payload: { weatherInfo, },
  }
);
