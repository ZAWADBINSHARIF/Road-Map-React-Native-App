import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ClerkProvider } from "@clerk/clerk-expo";
import axios from 'axios';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '@/store';
import useSecureStore from '@/hooks/useSecureStore';
import { removeLocalStorageThunk, setLocalStorageThunk } from '@/store/slices/userSlice';


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

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <RootSiblingParent>
        <RootLayoutNav />
      </RootSiblingParent >
    </Provider>
  );
}

function RootLayoutNav() {

  const dispatch = useDispatch();
  const { getToken } = useSecureStore();
  const token = async () => await getToken('token');


  axios.interceptors.request.use(async config => {

    if (await token()) {
      config.headers.Authorization = `Bearer ${await token()}`;
    }

    return config;
  });


  useEffect(() => {
    const fetchUserInfo = async () => {
      if (await token()) {
        try {
          const response = await axios.get('/verify');
          const userInfoString = JSON.stringify(response.data?.userInfo);

          dispatch(removeLocalStorageThunk('@userInfo') as any);
          dispatch(setLocalStorageThunk('@userInfo', userInfoString) as any);

        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchUserInfo();

  }, []);

  // useEffect(() => {
  //   router.push("/otp_submit");

  // });

  return (
    <ThemeProvider value={DefaultTheme} >
      <Stack
        screenOptions={{
          'animation': 'slide_from_right',
          'headerShown': false
        }}
      >
        <Stack.Screen name='(tabs)' />
      </Stack>
    </ThemeProvider>
  );
}

