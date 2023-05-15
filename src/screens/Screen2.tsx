import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {NavigationService} from '@navigations';
import {AppodealAds} from '@services';
import {SafeWebView} from '@components';

export const Screen2 = () => {
  useEffect(() => {
    AppodealAds.loadRandomAds();

    return () => {
      AppodealAds.showRandomAds();
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <Button
        title="Go to Screen1"
        onPress={() => {
          NavigationService.navigate('Screen1');
        }}
      />
      <SafeWebView source={{uri: 'https://www.google.com'}} style={{flex: 1}} />
    </View>
  );
};

const styles = StyleSheet.create({});
