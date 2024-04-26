import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ClerkProvider } from "@clerk/clerk-expo";
import axios from 'axios';
import { Provider } from 'react-redux';
import store from '@/store';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import GlobalProvider, { useGlobalContext } from '@/context/GlobalContext';


axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_BASE_URL;

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });



  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);


  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <GlobalProvider>

        <PaperProvider theme={MD3LightTheme}>

          <RootSiblingParent>

            <RootLayoutNav />

          </RootSiblingParent >

        </PaperProvider>

      </GlobalProvider>
    </Provider>
  );
}

function RootLayoutNav() {

  const { isError, isLoading, isConnected }: any = useGlobalContext();


  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  useEffect(() => {


    if (isLoading)
      return;

    if (isError) {
      router.push("/(error_page)");
    }

    if (!isError) {
      router.push("/(tabs)");
    }

  }, [isError, isLoading]);


  useEffect(() => {
    router.push("/cases");
  });


  return (
    <ThemeProvider value={DefaultTheme} >

      <Stack
        screenOptions={{
          'animation': 'slide_from_right',
          'headerShown': false
        }}
      >

        <Stack.Screen name='(drawer)' />

      </Stack>

    </ThemeProvider>
  );
}

