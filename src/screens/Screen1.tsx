import {NavigationService} from '@navigations';
import {AppodealAds} from '@services';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export const Screen1 = () => {
  useEffect(() => {}, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Button
          title={'Go to Screen2'}
          onPress={() => {
            NavigationService.navigate('Screen2');
          }}
        />
        <Text>{'Screen1'}</Text>
      </View>
      <AppodealAds.Banner />
    </View>
  );
};

const styles = StyleSheet.create({});
