import { ActionType } from '../actions';
import { fetchGooglePlacesApi, fetchWeatherData } from '../../services/http-requests';
import { fetchData, fetchDataSuccess } from './fetch-data';
import { selectLocationSuccess } from './select-location';

export const fetchGooglePlaces = (locationData) => (
  (dispatch) => {
    console.log('fetch-google-places.js: ', locationData);
    return new Promise.resolve(dispatch(fetchGooglePlacesRequest()))
      .then(async () => await fetchGooglePlacesApi(locationData))
      .then((weatherInfo) => {
        console.log('fetch-google-places-api: ', weatherInfo);
        dispatch(fetchGooglePlacesSuccess(weatherInfo.result.geometry.location))
        return weatherInfo.result.geometry.location;
      })
      .then(async (geometryLocation) => await fetchWeatherData(geometryLocation))
      .then((darkSkyData) => {
        console.log('darkSkyData resultzzz: ', darkSkyData)
        dispatch(fetchDataSuccess(darkSkyData))
        return darkSkyData;
      })
      .then((darkSkyData) => {
        console.log('selectLocationSuccess darkSkyData: ', darkSkyData)
        dispatch(selectLocationSuccess(darkSkyData))
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
