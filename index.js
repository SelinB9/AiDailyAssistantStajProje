/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

//index.js dosyasının temel amacı, React Native'in yerel (native) Android/iOS uygulama kabuğuna,
//  uygulamanın ana JavaScript bileşenini (App.js) hangi isimle başlatması gerektiğini bildirmektir.