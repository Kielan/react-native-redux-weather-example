import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  View,
  Button,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';

const defaultStyles = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  textInputContainer: {
    backgroundColor: '#C9C9CE',
    height: 44,
    borderTopColor: '#7e7e7e',
    borderBottomColor: '#b5b5b5',
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    flexDirection: 'row',
  },
  textInput: {
    borderColor: '#444',
    backgroundColor: '#f7f7f7',
    height: 28,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 7.5,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 15,
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#b5b5b5',
    alignItems: 'center',
    justifyContent: 'center',
  }
}

export class GooglePlacesAutocompleteSearch extends React.Component {
  constructor (props) {
    super(props);
    this.state = this.getInitialState.call(this);
  }
  getInitialState = () => ({
    text: this.props.getDefaultValue(),
//    dataSource: this.buildRowsFromResults([]),
//    listViewDisplayed: this.props.listViewDisplayed === 'auto' ? false : this.props.listViewDisplayed,
  })
  componentDidMount() {
    // This will load the default value's search results after the view has
    // been rendered
    this._handleChangeText(this.state.text);
    this._isMounted = true;
  }
  onCancel = async () => {
    await this.setState({ keyword: '' });
    await this.setState(prevState => {
      return { expanded: !prevState.expanded };
    });
    this.props.onCancel && (await this.props.onCancel());
  };
  _onChangeText = async (text) => {
    console.log('_onChangeText text: ', text)

    try {
      this.props.fetchGooglePlacesAutocomplete(text);

      this.setState({ text: text, listViewDisplayed: this._isMounted || this.props.autoFocus,});
    } catch(e) {
      console.log('onchangetext err: ', e)
    }
  }
  _handleChangeText = async (text) => {
    console.log('_handleChangeText text: ', text)

    await this._onChangeText(text);

    const onChangeText = this.props
      && this.props.textInputProps
      && this.props.textInputProps.onChangeText;

    if (onChangeText) {
      onChangeText(text);
    }
  }
  _onFocus = () => this.setState({ listViewDisplayed: true })
  render() {
    let {
      onFocus,
      ...userProps
    } = this.props.textInputProps;
    const { width } = Dimensions.get('window');
    const inputFocusWidthAnimated = (width - 100);
    return (
      <View
        style={[defaultStyles.container, this.props.styles.container]}
        pointerEvents="box-none"
      >
        <TextInput
          ref="textInput"
          editable={this.props.editable}
          returnKeyType={this.props.returnKeyType}
          autoFocus={true}
          style={[defaultStyles.textInput, {width: inputFocusWidthAnimated}]}
          value={this.state.text}
          placeholder={this.props.placeholder}
          onSubmitEditing={this.props.onSubmitEditing}
          placeholderTextColor={this.props.placeholderTextColor}
          onFocus={onFocus ? () => {this._onFocus(); onFocus()} : this._onFocus}
          clearButtonMode="while-editing"
          underlineColorAndroid={this.props.underlineColorAndroid}
          { ...userProps }
          onChangeText={text => this._handleChangeText(text)}
        />
        <TouchableOpacity onPress={this.onCancel}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            flex: 1,
            paddingTop: 4.5,
            paddingBottom: 4.5,
            paddingLeft: 8,
            paddingRight: 8,
          }}>
            <Text style={defaultStyles.cancelButtonText}>
              {`cancel`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

GooglePlacesAutocompleteSearch.propTypes = {

}
