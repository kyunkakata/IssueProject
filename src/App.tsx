import React, {useEffect} from 'react';
import {LogBox, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {
  Edge,
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import {observer} from 'mobx-react-lite';

import {RootNavigator} from '@navigations';
import {hydrateStores, initStores, useStores, withStore} from '@stores';
import '@helpers';
import {
  initServices,
  withServices,
  disposeServices,
  EventBus,
  EVENT_NAME,
  FIRDynamicLinks,
} from '@services';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
  },
};

// ignore some errors
LogBox.ignoreLogs(['[mobx] Out of bounds']);
LogBox.ignoreLogs(['new NativeEventEmitter']);

const SAFE_EDGES: Edge[] = ['right', 'bottom', 'left'];

const App = observer(() => {
  const {AppStore} = useStores();

  const load = async () => {
    Promise.all([hydrateStores(), initStores(), initServices()]);
    await FIRDynamicLinks.init();
    AppStore.onAppOpen();
  };

  useEffect(() => {
    load();
    return () => {
      disposeServices();
    };
  }, []);

  return <RootNavigator />;
});

export default withStore(withServices(App));
