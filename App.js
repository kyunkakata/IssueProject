import React, {useEffect} from 'react';
import {View} from 'react-native';
import {AppodealAds} from './src/services/AppodealAds';
import {RootNavigator} from './src/App';

const App = () => {
  useEffect(() => {
    AppodealAds.init();
  }, []);

  return (
    <View style={{flex: 1}}>
      <RootNavigator />
    </View>
  );
};
