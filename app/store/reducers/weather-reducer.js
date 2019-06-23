// @flow

import {
  ActionType,
} from '../actions.js';

const initialState = {
  weatherInfo: {},
  isLoading: false,
  isloadingGooglePlaces: false,
  error: false,
  listViewDisplayed: false,
  searchResultData: [],
  locationCoords: {},
  indexWeatherLocations: [],
  indexWeatherListData: [],
};

//state."weather" is this reducer module
export const getWeatherSelector = (state) => ({ ...state.weather });

const weatherReducer = (state = initialState, action) => {
  if (action.type == 'SELECT_LOCATION_SUCCESS') {
    console.log('action.type === select_location_success: ', action)
  }
  console.log('selectLocationSuccess', action)
  switch (action.type) {
    case ActionType.GOOGLE_PLACES_AUTOCOMPLETE_ERROR: {
      return {
        ...state,
        error: true,
      }
    }
    case ActionType.GOOGLE_PLACES_AUTOCOMPLETE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case ActionType.GOOGLE_PLACES_AUTOCOMPLETE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        searchResultData: action.payload.searchResultData,
      }
    }
    case ActionType.GOOGLE_PLACES_ERROR: {
      return {
        ...state,
        error: true,
        isloadingGooglePlaces: false,
      }
    }
    case ActionType.GOOGLE_PLACES_REQUEST: {
      return {
        ...state,
        isloadingGooglePlaces: true
      }
    }
    case ActionType.GOOGLE_PLACES_SUCCESS: {
      return {
        ...state,
        searchResultData: action.payload.predictions,
        isloadingGooglePlaces: false,
      }
    }
    case ActionType.SELECT_LOCATION_SUCCESS: {
      return {
        ...state,
        indexWeatherListData: [...state.indexWeatherListData, action.payload.weatherInfo],
        isLoading: false,
      }
    }
    case ActionType.SELECT_LOCATION_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case ActionType.SET_LOCATION_SUCCESS: {
      return {
        ...state,
        isLoadingSetLocation: false,
        error: false,
      };
    }
    case ActionType.SET_LOCATION_REQUEST: {
      return {
        ...state,
        isLoadingSetLocation: true,
        error: false,
        weatherInfo: {},
      };
    }
    case ActionType.SET_LOCATION_ERROR: {
      return {
        ...state,
        isLoadingSetLocation: false,
        error: true,
      };
    }
    case ActionType.FETCH_DATA_SUCCESS: {
      return {
        ...state,
        isLoadingFetch: false,
        error: false,
        weatherInfo: action.payload.weatherInfo,
      };
    }
    case ActionType.FETCH_DATA_REQUEST: {
      return {
        ...state,
        isLoadingFetch: true,
        error: false,
        weatherInfo: {},
      };
    }
    case ActionType.FETCH_DATA_ERROR: {
      return {
        ...state,
        isLoadingFetch: false,
        error: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default weatherReducer;
