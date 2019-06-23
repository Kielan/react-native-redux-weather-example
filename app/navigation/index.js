import {
  createAppContainer,
  createStackNavigator,
} from 'react-navigation'
import { MainScreen, SearchScreen } from '../screens'

export const NavigationStack = createAppContainer(createStackNavigator(
  {
    MainScreen: MainScreen,
    SearchScreen: SearchScreen,
  },
  {
    initialRouteName: 'MainScreen',
//  headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      headerVisible: false,
    }
  }
))
