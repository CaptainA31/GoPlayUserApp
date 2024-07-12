import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import SplashScreen from './screens/Splash';
import SignIn from './screens/signin/SignIn';
import SignUp from './screens/signin/SignUp';
import GetPhone from './screens/signup/GetPhone';
import GetEmail from "./screens/signup/GetEmail";
import OtpVerification from './screens/signin/OtpVerifcation';
import HostActivity from "./screens/hostActivity/HostActivity";
import Home from "./screens/home/Home";
import Play from './screens/play/Play';
import Book from './screens/book/book';
import EditProfile from './screens/profile/EditProfile';
import Wallet from './screens/wallet/Wallet';
import { CustomDrawerComponent } from './components/CustomDrawer';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from './GlobalStyles';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Provider } from 'react-native-paper';
import store from "./redux/store";

enableScreens(false);

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [progress, setProgress] = useState(useSharedValue(0));
  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderRadius: 26,
      transform: [{ scale: 1 }],
    };
  });

  return (
    <LinearGradient
      colors={[colors.lightGreen, colors.lightGreen]}
      style={{ flex: 1 }}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        drawerStyle={styles.drawerStyle}
        sceneContainerStyle={styles.sceneContainerStyle}
        initialRouteName="HOME"
        drawerContent={props => {
          setTimeout(() => {
            setProgress(props.progress);
          }, 2);
          return <CustomDrawerComponent navigation={props.navigation} />;
        }}>
        <Drawer.Screen name="HOME">
          {props => <Home {...props} drawerAnimationStyle={animatedStyle} />}
        </Drawer.Screen>
        <Drawer.Screen name="BOOK">
          {props => <Book {...props} drawerAnimationStyle={animatedStyle} />}
        </Drawer.Screen>
        <Drawer.Screen name="PLAY">
          {props => <Play {...props} drawerAnimationStyle={animatedStyle} />}
        </Drawer.Screen>
        <Drawer.Screen name="EDITPROFILE">
          {props => (
            <EditProfile {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="WALLET">
          {props => <Wallet {...props} drawerAnimationStyle={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </LinearGradient>
  );
};

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DrawerNavigator" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        <Stack.Screen name="otp" component={OtpVerification} />
        <Stack.Screen name="signin" component={SignIn} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="signup" component={SignUp} />
        <Stack.Screen name="getPhone" component={GetPhone} />
        <Stack.Screen name="getEmail" component={GetEmail} />
        <Stack.Screen name="hostActivity" component={HostActivity} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerStyle: {
    width: '75%',
    backgroundColor: 'transparent',
  },
  sceneContainerStyle: {
    backgroundColor: 'transparent',
  },
});
