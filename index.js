/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './modules/lang/LangAdapter'

AppRegistry.registerComponent(appName, () => App);
