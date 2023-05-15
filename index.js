/**
 * @format
 */

import { AppRegistry } from 'react-native';

import App from './src/App';
import { name as appName } from './app.json';
import 'react-native-reanimated';
import 'react-native-random-values-jsi-helper';

AppRegistry.registerComponent(appName, () => App);
