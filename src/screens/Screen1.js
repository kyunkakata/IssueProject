import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {AppodealAds} from '../services/AppodealAds';

export class Screen1 extends PureComponent {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Screen1</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Screen2');
          }}>
          <Text>Go to Screen2</Text>
        </TouchableOpacity>
        <AppodealAds.Banner />
      </View>
    );
  }
}

export default Screen1;
