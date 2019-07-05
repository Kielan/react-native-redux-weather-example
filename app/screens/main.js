import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import WeatherComponent from '../components/weather-component';
import { getWeatherSelector } from '../store/reducers/weather-reducer';
import { fetchData } from '../store/actions/fetch-data';
import { setLocationData } from '../store/actions/set-location-data';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
})

const mapStateToProps = (state) => getWeatherSelector(state);

const mapDispatchToProps = (dispatch) => ({
  fetchData: (location) => dispatch(fetchData(location)),
  setLocationData: () => dispatch(setLocationData())
});

let WeatherContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WeatherComponent);

export class MainScreen extends React.Component {
  static navigationOptions = (props) => {
    return {
      header: null,
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <WeatherContainer navigation={this.props.navigation}/>
      </View>
    )
  }
}
