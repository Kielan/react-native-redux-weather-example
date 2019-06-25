import { ActionType } from '../actions';
import { fetchGooglePlacesApi, fetchWeatherData, orderWeatherData } from '../../services/http-requests';
import { fetchData, fetchDataSuccess } from './fetch-data';
import { selectLocationSuccess } from './select-location';

export const fetchGooglePlaces = (locationData) => (
  (dispatch) => {
    var locationName;
    return new Promise.resolve(dispatch(fetchGooglePlacesRequest()))
      .then(async () => await fetchGooglePlacesApi(locationData))
      .then((weatherInfo) => {
        dispatch(fetchGooglePlacesSuccess(weatherInfo.result.geometry.location))
        locationName = weatherInfo.result.name;
        return weatherInfo.result.geometry.location;
      })
      .then(async (geometryLocation) => await fetchWeatherData(geometryLocation))
      .then((darkSkyData) => {
        dispatch(fetchDataSuccess(darkSkyData))
        return darkSkyData;
      })
      .then(async (darkSkyData) => await orderWeatherData(darkSkyData))
      .then((weatherDict) => {
        dispatch(selectLocationSuccess({name: locationName, weatherDict: weatherDict}))
      })
      .catch((err) => {
        dispatch(fetchGooglePlacesError())
      });
  }
);

export const fetchGooglePlacesError = () => (
  {
    type: ActionType.GOOGLE_PLACES_ERROR,
    payload: { isLoading: false },
  }
);

export const fetchGooglePlacesRequest = () => (
  {
    type: ActionType.GOOGLE_PLACES_REQUEST,
    payload: { isLoading: true },
  }
);

export const fetchGooglePlacesSuccess = (weatherPredictionsList) => (
  {
    type: ActionType.GOOGLE_PLACES_SUCCESS,
    payload: { isLoading: false, predictions: weatherPredictionsList },
  }
);
