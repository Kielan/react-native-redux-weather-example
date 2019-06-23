import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import SearchComponent from '../components/search-component';
import { SearchHeaderComponent, SearchHeaderContainer } from '../components/search-header';
import { getWeatherSelector } from '../store/reducers/weather-reducer';
import { fetchData } from '../store/actions/fetch-data';
import { selectLocation } from '../store/actions/select-location';
import { fetchGooglePlaces } from '../store/actions/fetch-google-places';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
})

const mapStateToProps = (state) => getWeatherSelector(state);

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchData()),
  selectLocation: (coords) => dispatch(selectLocation(coords)),
  fetchGooglePlaces: (locationData) => dispatch(fetchGooglePlaces(locationData)),
});

let SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchComponent);

export class SearchScreen extends React.Component {
  static navigationOptions = (props) => {
    console.log('SearchScreen navigationOptions props: ', props)
    return {
      // headerTitle instead of title
      headerLeft: null,
      headerTitle: <SearchHeaderContainer goBack={props.navigation.goBack} />,
    }
  };
  render() {
    console.log('mainscreen this.props: ', this.props, 'this.weatherInfo: ', this.navigationOptions)
    return (
      <View style={styles.container}>
        {<SearchContainer navigation={this.props.navigation} />}
      </View>
    )
  }
}
