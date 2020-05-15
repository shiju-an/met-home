import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import SearchScreen from '../components/SearchScreen.js';
import ResultsScreen from '../components/ResultsScreen.js';
import GalleryScreen from '../components/GalleryScreen.js';

const screens = {
  Search: {
    screen: SearchScreen,
  },
  Results: {
    screen: ResultsScreen,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);