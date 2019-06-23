import { ActionType } from '../actions';
import { fetchGooglePlacesAutocompleteApi } from '../../services/http-requests';

export const fetchGooglePlacesAutocomplete = (text) => (
  (dispatch) => {
    return new Promise.resolve(dispatch(googlePlacesAutocompleteRequest()))
    .then(() => {
      return fetchGooglePlacesAutocompleteApi(text)
    })
    .then((autoCompleteLocationlist) => {
      console.log('fetchGooglePlacesAutocomplete: ', autoCompleteLocationlist.predictions)
      return dispatch(googlePlacesAutocompleteSuccess(autoCompleteLocationlist.predictions))
    })
    .catch((err) => {
      dispatch(googlePlacesAutocompleteError())
    })
  }
)

export const googlePlacesAutocompleteError = () => (
  {
    type: ActionType.GOOGLE_PLACES_AUTOCOMPLETE_ERROR,
    payload: { isLoading: false, placesAutocompleteError: true },
  }
);

export const googlePlacesAutocompleteRequest = () => (
  {
    type: ActionType.GOOGLE_PLACES_AUTOCOMPLETE_REQUEST,
    payload: { isLoading: true },
  }
);

export const googlePlacesAutocompleteSuccess = (weatherPredictionsList) => {
  console.log('googlePlacesAutocompleteSuccess action: ', weatherPredictionsList)
  return (
    {
      type: ActionType.GOOGLE_PLACES_AUTOCOMPLETE_SUCCESS,
      payload: { isLoading: false, searchResultData: weatherPredictionsList },
    }
  );
}
