import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MapResult from '../screens/MapResult';
import RouteDirections from '../screens/RouteDirections';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    MapResults: MapResult,
    RouteDirections: RouteDirections
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
