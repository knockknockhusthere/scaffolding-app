import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import RouteDirections from '../screens/RouteDirections';
import Search from '../screens/Search';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    SearchResultScreen: SearchResultScreen,
    RouteDirections: RouteDirections,
    Search: Search
  },
  { initialRouteName: 'Home'}
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Search Route(s)',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        `ios-navigate${focused ? '' : '-outline'}`
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Scaffold Locations',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={`ios-map${focused ? '' : '-outline'}`}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
});
