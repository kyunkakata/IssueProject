import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {enableFreeze, enableScreens} from 'react-native-screens';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';

enableFreeze(true);
enableFreeze(true);

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          stackPresentation: 'modal',
          headerShown: false,
        }}>
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
