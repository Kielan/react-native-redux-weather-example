// @flow

import React from 'react';
import {
  Dimensions,
  View,
  Button,
  ImageBackground,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
//import ScrollableTabView from 'react-native-scrollable-tab-view'
import { ScrollableTabView } from '@valdio/react-native-scrollable-tabview'


import { getWeatherSelector } from '../store/reducers/weather-reducer';
import { fetchData } from '../store/actions/fetch-data';

var { height } = Dimensions.get('window');

const mapStateToProps = (state) => getWeatherSelector(state);

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchData()),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  },
  weatherInfoText: {
    textAlign: 'center',
    paddingVertical: 6,
    paddingHorizontal: 40,
  },
  button: {
    flex: 1,
    height: 50,
    width: 100,
  },
  summaryText: {
    fontSize: 32,
  },
  tempText: {
    fontSize: 32,
  },
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#fff',
  },
  searchInput: {
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: 3,
    height: 45,
    marginTop: 3,
    marginLeft: 10,
    marginRight: 10,
  },
  locationInput: {
    marginTop: 10,
  },
});

const getErrorMessage = () => (
  <Text style={styles.errorText}>
    An Error occured when fetching data
  </Text>
);

const getWeatherInfo = (weatherInfo, navigation) => {
  const { summary, temperature } = weatherInfo;
  const info = temperature
    ? `${Math.floor(temperature)} deg, ${summary}`
    : 'No Weather Info Available. Make sure you provided a valid API key in the `config.js` file.';
  const tempInfo = temperature
    ? `${Math.floor(temperature)}` : `ERROR`;
  return (
    <View style={{flex: 1}}>
      <ImageBackground source={require('./images/blue_sky.png')} style={{width: '100%', height: height}}>
      <View style={styles.headerContainer}>
        <Button
          title='Add Location'
          onPress={() => navigation.navigate('SearchScreen')}
          style={styles.button}
          />
        <Icon
          name={`ios-sunny`}
          size={20}
          style={{
            textAlign: 'center',
            marginRight: 10,
            width: 20,
          }} />
        <Text style={styles.tempText}>{tempInfo}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.summaryText}>{summary}</Text>
      </View>
      </ImageBackground>
    </View>
  );
};

class Count extends React.Component {
  render() {
    return <Text>Count: {this.props.value}</Text>
  }
}

let WeatherContainer = connect(state => ({ value: state.count }))(Count);

class WeatherComponentScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      componentLocation: null
    }
  }
  render() {
    const {
      fetchData,
      isLoading,
      key,
      navigation,
      savedLocation,
      weatherInfotab,
      tabLabel,
    } = this.props;

    console.log('weather-component props saveLocation: ', savedLocation);
    const hasWeatherData = isLoading ? null : Object.keys(savedLocation).length;
    return (
      <ScrollView key={key} style={{flex: 1}} tabLabel={tabLabel}>
        <View key={key} style={{flex: 1, flexGrow: 1, height: height}} tabLabel={tabLabel}>
          {isLoading ? <ActivityIndicator /> : null}
          {hasWeatherData ? getWeatherInfo(savedLocation, navigation) : null}
        </View>
      </ScrollView>
    )
  }
}

export default class WeatherComponent extends React.Component {
    render() {
      const {
        isLoading,
        error,
        fetchData,
        weatherInfo,
        indexWeatherLocations,
        indexWeatherListData,
        navigation
      } = this.props;
      //if not weather info causes err
      console.log('weather-component props indexWeatherLocations', this.props.indexWeatherLocations)
      console.log('weather-component props weatherInfo', this.props.indexWeatherListData)

      return (
        <View style={styles.container}>
          {error ? getErrorMessage() : null}
          {indexWeatherListData.length === 0 &&
            <Button
              title='Add Location'
              onPress={() => navigation.navigate('SearchScreen')}
              style={styles.button}
              />
          }
          {indexWeatherListData.length > 0 &&
            <ScrollableTabView
                  contentContainerStyle={{flexGrow: 1, flex: 1, height: "100%"}}
                  renderTabBar={false}
                >
              {indexWeatherListData.map(
                (savedLocation, i) => <WeatherComponentScreen
                    navigation={navigation}
                    key={`${i}`}
                    savedLocation={savedLocation}
                    tabLabel={`pages_${i}`}
                    isLoading={isLoading} />
              )}
            </ScrollableTabView>}
        </View>
      );
    }
}
