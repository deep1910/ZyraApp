import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Import screens
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProductListingScreen from './src/screens/ProductListingScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/cartScreen';
const Stack = createNativeStackNavigator();

function NestedNavigationContainer(){
  return(
    <Stack.Navigator 
    initialRouteName="Landing"
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right'
    }}
  >
    <Stack.Screen name="CartScreen" component={CartScreen}/>
    <Stack.Screen name="Landing" component={LandingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="ProductListing" component={ProductListingScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
  </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <StatusBar style="auto" />
      <NestedNavigationContainer/>
    </NavigationContainer>
  );
}





// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { Provider as PaperProvider } from 'react-native-paper';
// import AppNavigator from './src/navigation/AppNavigator';
// import { StatusBar } from 'expo-status-bar';

// export default function App() {
//   return (
//     <PaperProvider>
//       <NavigationContainer independent={true}>
//         <StatusBar style="auto"/>
//         <AppNavigator />
//       </NavigationContainer>
//     </PaperProvider>
//   );
// }