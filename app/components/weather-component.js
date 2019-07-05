// @flow

import React from 'react';
import {
  Animated,
  Easing,
  Dimensions,
  View,
  Button,
  ImageBackground,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { ScrollableTabView } from '@valdio/react-native-scrollable-tabview'
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Header } from 'react-navigation';
import { RNSNap } from './rn-snap';
import { getWeatherSelector } from '../store/reducers/weather-reducer';
import { fetchData } from '../store/actions/fetch-data';

var { height } = Dimensions.get('window');


const MIN_HEIGHT = Header.HEIGHT;
const MAX_HEIGHT = 150;
const IS_IOS = Platform.OS === 'ios';

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
  dailyContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  weeklyContainer: {
    flex: 1,
    flexDirection: 'column',
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

const GetWeatherInfo = ({dailyForecast, navigation}) => {
  const { summary, temperature } = dailyForecast;
  const info = temperature
    ? `${Math.floor(temperature)} deg, ${summary}`
    : 'No Weather Info Available. Make sure you provided a valid API key in the `config.js` file.';
  const tempInfo = temperature
    ? `${Math.floor(temperature)}` : `ERROR`;
  return (
    <View style={{flex: 1}}>
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
    </View>
  );
};
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const GetThisDayWeatherInfo = ({hourlyForecast}) => {
    //for demonstration purposes lop off past hour 24
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={styles.dailyContainer}>
        <ScrollView
          style={{flex: 1, height: 100, borderTopWidth: 1, borderTopColor: "#ffffff",  borderBottomWidth: 1, borderBottomColor: "#ffffff"}}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {Object.keys(hourlyForecast.data).map((keyName, keyIndex) => {
            let weekdayObj = hourlyForecast.data[keyName];
            if (keyIndex > 24 || !weekdayObj) return;

            return (
              <View style={{flex: 1, width: 100, justifyContent: 'space-around', flexDirection: 'column'}}>
                {keyIndex < 1 ? <Text>{`Now`}</Text> : <Text style={{color: "#ffffff"}}>{weekdayObj.weekDay}</Text>}
                <View><Icon
                  name={`ios-sunny`}
                  size={20}
                  style={{
                    textAlign: 'center',
                    marginRight: 10,
                    width: 20,
                  }} /></View>
                  <View><Text style={{color: "#ffffff"}}>{Math.floor(weekdayObj.temperature)+"\u00B0"}</Text></View>
              </View>
              )
          })}
          </ScrollView>
        </View>
      </View>
    )
}

const GetThisWeekWeatherInfo = ({weatherDict}) => {

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={styles.weeklyContainer}>
        {Object.keys(weatherDict).map((keyName, keyIndex) => {
          let weekdayObj = weatherDict[keyName];

          return (
            <View style={{flex: 1, width: 300, justifyContent: 'space-around', flexDirection: 'row', paddingVertical: 8}}>
              <Text style={{fontSize: 18, color: "#ffffff"}}>{weekdayObj.weekDay}</Text>
              <Icon
                name={`ios-sunny`}
                size={20}
                style={{
                  textAlign: 'center',
                  marginRight: 10,
                  width: 20,
                }} />
                <Text style={{fontSize: 16, color: "#ffffff"}}>{Math.floor(weekdayObj.temperatureMax)}</Text>
                <Text style={{fontSize: 16, color: "#ffffff"}}>{Math.floor(weekdayObj.temperatureMin)}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}
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
      componentLocation: null,
      prevScrollDirection: ''
    }
  }
  onScroll = (event) => {
    var currentOffset = event.nativeEvent.contentOffset.y;
        var direction = currentOffset > this.offset ? 'down' : 'up';
    this.offset = currentOffset;
    console.log('onScroll(event): ', direction);
    if (direction === 'up') {
      this.navTitleView.fadeOut();
    }
  }
  render() {
    const {
      fetchData,
      isLoading,
      navigation,
      savedLocation,
      weatherInfotab,
      tabLabel,
    } = this.props;
//onHide={() => this.navTitleView.fadeInUp(200)}
//onDisplay={() => this.navTitleView.fadeOut(100)}
    const hasWeatherData = isLoading ? null : Object.keys(savedLocation).length;
    return (
      <ImageBackground source={require('./images/blue_sky.png')} style={{width: '100%', height: height, flexDirection: 'column'}}>
        {isLoading ? <ActivityIndicator /> : null}
        {/*(hasWeatherData && savedLocation.weatherDict.dailyForecast != 'undefined') ?
          <HeaderImageScrollView
          onScroll={this.onScroll}
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          maxOverlayOpacity={0.0}
          minOverlayOpacity={0.0}
          scrollViewBackgroundColor={`#FF000000`}
          ScrollViewComponent={() => <ScrollView
            ref={carouselRef => {
              this._carouselRef = carouselRef;
            }}
            />
          }
          renderHeader={() => <GetWeatherInfo dailyForecast={savedLocation.weatherDict.dailyForecast} navigation={navigation} />}
          renderForeground={() => (
            <Animatable.View
              style={{flex: 1, height: 250, paddingTop: 60, paddingBottom: 20, justifyContent: 'center'}}
              onHide={() => this.navTitleView.fadeOut(200)}
              ref={navTitleView => {
                this.navTitleView = navTitleView;
              }}>
              <Text style={{fontSize: 64, textAlign: 'center'}}>
                {`19` + "\u00B0"}
              </Text>
            </Animatable.View>
        )}
          fadeOutForeground={true}
          disableHeaderGrow={true}>
          <TriggeringView
            style={styles.section}
          >
          <GetThisDayWeatherInfo hourlyForecast={savedLocation.weatherDict.hourlyForecast} />
          <ScrollView style={{flex: 1}}>
           <GetThisWeekWeatherInfo weatherDict={savedLocation.weatherDict.dailyForecast} />
           <View style={{ paddingTop: 20, paddingBottom: 20, borderTopWidth: 1, borderTopColor: "#ffffff", borderBottomWidth: 1, borderBottomColor: "#ffffff"}}>
            <Text style={{ fontSize: 18 }}>{savedLocation.weatherDict.hourlyForecast.summary}</Text>
           </View>
           <View>
           <View style={{ paddingTop: 20, paddingBottom: 20}}>
            <Text style={{ fontSize: 18 }}>{`sunrise`}</Text>
            <Text style={{ fontSize: 18 }}>{`05:21`}</Text>
           </View>
           <View style={{ paddingTop: 20, paddingBottom: 20}}>
            <Text style={{ fontSize: 18 }}>{`sunset`}</Text>
            <Text style={{ fontSize: 18 }}>{`21:21`}</Text>
          </View>
          <View style={{ paddingTop: 20, paddingBottom: 20}}>
           <Text style={{ fontSize: 18 }}>{`sunrise`}</Text>
           <Text style={{ fontSize: 18 }}>{`05:21`}</Text>
          </View>
          <View style={{ paddingTop: 20, paddingBottom: 20}}>
           <Text style={{ fontSize: 18 }}>{`sunset`}</Text>
           <Text style={{ fontSize: 18 }}>{`21:21`}</Text>
          </View>

         </View>
        </ScrollView>
        </TriggeringView>
    </HeaderImageScrollView> : null*/}
    {(hasWeatherData && savedLocation.weatherDict.dailyForecast != 'undefined') &&
        <RNSnap vertical="true">
            <GetWeatherInfo dailyForecast={savedLocation.weatherDict.dailyForecast} navigation={navigation} />
            <Animatable.View
              style={{flex: 1, height: 250, paddingTop: 60, paddingBottom: 20, justifyContent: 'center'}}
              onHide={() => this.navTitleView.fadeOut(200)}
              ref={navTitleView => {
                this.navTitleView = navTitleView;
              }}>
              <Text style={{fontSize: 64, textAlign: 'center'}}>
                {`19` + "\u00B0"}
              </Text>
            </Animatable.View>
            <GetThisDayWeatherInfo hourlyForecast={savedLocation.weatherDict.hourlyForecast} />
            <ScrollView style={{flex: 1}}>
             <GetThisWeekWeatherInfo weatherDict={savedLocation.weatherDict.dailyForecast} />
             <View style={{ paddingTop: 20, paddingBottom: 20, borderTopWidth: 1, borderTopColor: "#ffffff", borderBottomWidth: 1, borderBottomColor: "#ffffff"}}>
              <Text style={{ fontSize: 18 }}>{savedLocation.weatherDict.hourlyForecast.summary}</Text>
             </View>
             <View>
             <View style={{ paddingTop: 20, paddingBottom: 20}}>
              <Text style={{ fontSize: 18 }}>{`sunrise`}</Text>
              <Text style={{ fontSize: 18 }}>{`05:21`}</Text>
             </View>
             <View style={{ paddingTop: 20, paddingBottom: 20}}>
              <Text style={{ fontSize: 18 }}>{`sunset`}</Text>
              <Text style={{ fontSize: 18 }}>{`21:21`}</Text>
            </View>
            <View style={{ paddingTop: 20, paddingBottom: 20}}>
             <Text style={{ fontSize: 18 }}>{`sunrise`}</Text>
             <Text style={{ fontSize: 18 }}>{`05:21`}</Text>
            </View>
            <View style={{ paddingTop: 20, paddingBottom: 20}}>
             <Text style={{ fontSize: 18 }}>{`sunset`}</Text>
             <Text style={{ fontSize: 18 }}>{`21:21`}</Text>
            </View>

           </View>
          </ScrollView>
        </RNSnap>
    }
      </ImageBackground>
    )
  }
}

export default class WeatherComponent extends React.Component {
    constructor(props) {
      super(props);
  }
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
      const getErrorMessage = () => (
        <Text style={styles.errorText}>
          An Error occured when fetching data
        </Text>
      );
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
              contentContainerStyle={{
                flexGrow: 1,
                flex: 1,
                height: "100%"
              }}
              renderTabBar={false}>
              {indexWeatherListData.map((savedLocation, i) =>
                <WeatherComponentScreen
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
