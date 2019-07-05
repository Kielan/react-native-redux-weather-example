import React from 'react';
import {
  Image,
  FlatList,
  View,
  Button,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
var AlphabetListView = require('react-native-alphabetlistview');
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Search from 'react-native-search-box';

const rowHeight = 40;

const keyGenerator = () => (
  Math.random().toString(36).substr(2, 10)
);

const defaultStyles = {
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  row: {
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#c8c7cc',
  },
}

class SearchComponent extends React.Component {
  // Important: You must return a Promise
  onSearch = (searchText) => {
      return new Promise((resolve, reject) => {
          console.log(searchText);
          console.log('Add your search function here.');
          resolve();
      });
  }
  onSelectRow = (locationData) => {
    Promise.resolve(this.props.fetchGooglePlaces(locationData.item.place_id))
    .then(() => {
      this.props.navigation.navigate('MainScreen')
    });
  }
  renderRow = (item, sectionId, index) => {
    return (
      <TouchableHighlight
        style={{
          height: rowHeight,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => this.onSelectRow(item)}
      >
        <Text>{item.item.description}</Text>
      </TouchableHighlight>
    );
  }
  _renderSeparator = (sectionID, rowID) => {
    if (rowID == this.state.dataSource.length - 1) {
      return null
    }

    return (
      <View
        key={ `${sectionID}-${rowID}` }
        style={defaultStyles.separator} />
    );
  }
  _renderPoweredLogo = () => {
    if (!this._shouldShowPoweredLogo()) {
      return null
    }

    return (
      <View
        style={[defaultStyles.row, defaultStyles.poweredContainer]}
      >
        <Image
          style={defaultStyles.powered}
          resizeMode='contain'
          source={require('./images/powered_by_google_on_white.png')}
        />
      </View>
    );
  }
  _shouldShowPoweredLogo = () => {
    if (!this.props.enablePoweredByContainer || this.state.dataSource.length == 0) {
      return false
    }

    for (let i = 0; i < this.state.dataSource.length; i++) {
      let row = this.state.dataSource[i];

      if (!row.hasOwnProperty('isCurrentLocation') && !row.hasOwnProperty('isPredefinedPlace')) {
        return true
      }
    }

    return false
  }
  render() {
    const {
      isLoading,
      isloadingGooglePlaces,
      error,
      fetchData,
      weatherInfo,
      searchResultData,
      selectLocation,
    } = this.props;
    return (
      <View style={{flex: 1}}>
        {isloadingGooglePlaces && <ActivityIndicator />}
        {error && getErrorMessage()}
         {searchResultData && searchResultData.length > 0 && <FlatList
           style={{flex: 1}}
           data={searchResultData}
           keyExtractor={keyGenerator}
           renderItem={this.renderRow}
           {...this.props}
         />}
      </View>
    );
  }
};
//           ListFooterComponent={this._renderPoweredLogo}
//           ItemSeparatorComponent={this._renderSeparator}
export default SearchComponent;
