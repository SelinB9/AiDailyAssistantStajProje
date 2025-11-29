import React from 'react';
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Kendi oluşturduğumuz ekranı içe aktarıyoruz
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';


// Stack Navigator'ı oluşturma
const Stack = createNativeStackNavigator();

// Tema ayarları (Renkler burada tanımlanır)
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4CAF50', // Yeşil tonu (Analiz başarılı/pozitif için uygun)
    secondary: '#FFC107', // Sarı tonu
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{ headerShown: false }} 
        >
          <Stack.Screen name="Home" component={HomeScreen} /> 
          <Stack.Screen name="History" component={HistoryScreen} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;