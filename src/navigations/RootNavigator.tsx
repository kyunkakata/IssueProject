import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {enableFreeze, enableScreens} from 'react-native-screens';

import {NavigationService} from '@navigations';
import {Screen1, Screen2} from '@screens';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

enableScreens(true);
enableFreeze(true);

const Stack = createNativeStackNavigator();

const stackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animationTypeForReplace: 'push',
};

const landscapeOtions: NativeStackNavigationOptions = {
  orientation: 'landscape',
};

function MyStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name={'Screen1'} component={Screen1} />
      <Stack.Screen name={'Screen2'} component={Screen2} />
    </Stack.Navigator>
  );
}
export const RootNavigator = () => {
  return (
    <NavigationContainer
      ref={NavigationService.navigationRef}
      // initialState={NavigationService.getInitialState()}
      onReady={NavigationService.onReady}
      onStateChange={NavigationService.onStateChange}>
      <MyStack />
    </NavigationContainer>
  );
};
