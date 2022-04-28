import Bugsnag from '@bugsnag/react-native';
Bugsnag.start();

import './theme';
import { AppRegistry } from 'react-native';

const App = require('./src').default;

AppRegistry.registerComponent('CrossroadsKidsClub', () => App);
