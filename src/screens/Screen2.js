import React from 'react';
import {Text, View} from 'react-native';
import {AppodealAds} from '../services/AppodealAds';
import WebView from 'react-native-webview';

export class Screen2 extends PureComponent {
  componentDidMount() {
    console.log('Screen2 componentDidMount');
    this.loadAd();
  }

  componentWillUnmount() {
    this.showAd();
  }

  loadAd = async () => {
    await AppodealAds.loadInterstitial();
  };

  showAd = async () => {
    AppodealAds.showInterstitial();
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <WebView
          style={{flex: 1}}
          source={{
            uri: 'https://www.google.com',
          }}
        />
      </View>
    );
  }
}

export default Screen2;
