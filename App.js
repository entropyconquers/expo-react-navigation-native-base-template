// In App.js in a new project
import { NativeBaseProvider, Text } from "native-base";
import * as React from 'react';
import { useCallback } from 'react';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}
function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Details")}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
const Stack = createNativeStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    'Hellix-Bold': require('./assets/fonts/Hellix-Bold.ttf'),
    'Hellix-Light': require('./assets/fonts/Hellix-Light.ttf'),
    'Hellix-Medium': require('./assets/fonts/Hellix-Medium.ttf'),
    'Hellix-Regular': require('./assets/fonts/Hellix-Regular.ttf'),
    'Hellix-SemiBold': require('./assets/fonts/Hellix-SemiBold.ttf'),
    'Hellix-ExtraBold': require('./assets/fonts/Hellix-ExtraBold.ttf'),
    'Hellix-Black': require('./assets/fonts/Hellix-Black.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NativeBaseProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            //hide header title
            headerTitle: "",
            //back button color black
            headerTintColor: "black",
            //backgrond color transparent
            headerTransparent: true,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;


