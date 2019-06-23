import { ActionType } from '../actions';
import { fetchWeatherData } from '../../services/http-requests';

export const fetchData = (location) => (
    (dispatch) => new Promise(function(resolve, reject) {
      console.log('postSelectLocationRequest() FETCH');
      dispatch(fetchDataRequest());
      return fetchWeatherData(location.coords)
        .then((weatherInfo) => dispatch(fetchDataSuccess({name: location.name, ...weatherInfo})))
        .then((weatherInfo) => {console.log('post-fetch-success', weatherInfo); resolve(weatherInfo)})
        .catch((err) => {
          dispatch(fetchDataError())
        });
    })
);

export const fetchDataError = () => (
  {
    type: ActionType.FETCH_DATA_ERROR,
    payload: { error: true },
  }
);

export const fetchDataSuccess = (weatherInfo) => (
  {
    type: ActionType.FETCH_DATA_SUCCESS,
    payload: {
      weatherInfo,
    },
  }
);

export const fetchDataRequest = () => (
  {
    type: ActionType.FETCH_DATA_REQUEST,
    payload: { isLoadingFetch: true },
  }
);
