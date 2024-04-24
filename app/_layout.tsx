import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useFonts } from 'expo-font';
import { router, Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { ClerkProvider } from "@clerk/clerk-expo";
import axios from 'axios';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '@/store';
import useSecureStore from '@/hooks/useSecureStore';
import { removeLocalStorageThunk, setLocalStorageThunk } from '@/store/slices/userSlice';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import InternetConnectionError from '@/components/InternetConnectionError';
import { StatusBar } from 'expo-status-bar';
import { useNetInfo } from '@react-native-community/netinfo';
import { ActivityIndicator } from 'react-native';


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
      <PaperProvider theme={MD3LightTheme}>
        <RootSiblingParent>
          <RootLayoutNav />
        </RootSiblingParent >
      </PaperProvider>
    </Provider>
  );
}

function RootLayoutNav() {

  const dispatch = useDispatch();
  const { getToken } = useSecureStore();
  const token = async () => await getToken('token');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isConnected } = useNetInfo();


  axios.interceptors.request.use(async config => {

    if (await token()) {
      config.headers.Authorization = `Bearer ${await token()}`;
    }

    return config;
  });

  const handleReload = async () => {

    if (await token()) {
      console.log('reload');
      try {
        setIsLoading(true);
        const response = await axios.get('/verify');
        const userInfoString = JSON.stringify(response.data?.userInfo);

        dispatch(removeLocalStorageThunk('@userInfo') as any);
        dispatch(setLocalStorageThunk('@userInfo', userInfoString) as any);

        setIsLoading(false);
        setIsError(false);

      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (await token()) {
        try {
          setIsLoading(true);
          const response = await axios.get('/verify');
          const userInfoString = JSON.stringify(response.data?.userInfo);

          dispatch(removeLocalStorageThunk('@userInfo') as any);
          dispatch(setLocalStorageThunk('@userInfo', userInfoString) as any);

          setIsLoading(false);

        } catch (error) {
          setIsError(true);
          setIsLoading(false);
          console.log(error);
        }
      }
    };

    fetchUserInfo();

  }, []);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  // useEffect(() => {
  //   router.push("/cases");
  // });


  return (
    <ThemeProvider value={DefaultTheme} >

      {
        isError ?
          <>
            <Slot />
            <InternetConnectionError handleReload={handleReload} />
          </>

          :
          (
            <Stack
              screenOptions={{
                'animation': 'slide_from_right',
                'headerShown': false
              }}
            >

              <Stack.Screen name='(tabs)' />
            </Stack>)
      }

    </ThemeProvider>
  );
}

