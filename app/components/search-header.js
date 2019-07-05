import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { GooglePlacesAutocompleteSearch } from "./google-places-autocomplete-search";
import { getWeatherSelector } from '../store/reducers/weather-reducer';
import { fetchGooglePlacesAutocomplete } from '../store/actions/fetch-google-places-autocomplete';

export class SearchHeaderComponent extends React.Component {
  render() {
    const {
      fetchGooglePlacesAutocomplete,
      goBack,
    } = this.props;
    return (
      <View style={{flex: 1}}>
        <GooglePlacesAutocompleteSearch
          fetchGooglePlacesAutocomplete={fetchGooglePlacesAutocomplete}
          getDefaultValue={() => ''}
          onCancel={goBack}
          textInputProps={{}}
          styles={{}}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => getWeatherSelector(state);

const mapDispatchToProps = (dispatch) => ({
  selectLocation: (coords) => dispatch(selectLocation(coords)),
  fetchGooglePlacesAutocomplete: (text) => dispatch(fetchGooglePlacesAutocomplete(text))
});

export const SearchHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchHeaderComponent);
