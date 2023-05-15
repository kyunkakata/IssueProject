import React from 'react';
import {Text, View} from 'react-native';
import {AppodealAds} from '../services/AppodealAds';

export class Screen2 extends PureComponent {
  componentDidMount() {
    console.log('Screen2 componentDidMount');
    this.loadAds();
  }

  loadAds = async () => {
    await AppodealAds.loadInterstitial();
    AppodealAds.showInterstitial();
  };

  render() {
    return (
      <View>
        <Text>Screen2</Text>
      </View>
    );
  }
}

export default Screen2;
