import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import NAVIGATION_STRING_CONSTANTS from './src/Navigation/Navigation';
import Custom_Drawer from './src/Components/Custom_Drawer';
import Splash_Screen from './src/Screens/Splash_Screen';
import Login_Screen from './src/Screens/Login_Screen';
import SignUp_Screen from './src/Screens/SignUp_Screen';
import Url_Screen from './src/Screens/Url_Screen';
import Text_Screen from './src/Screens/Text_Screen';
import Email_Screen from './src/Screens/Email_Screen';
import Sms_Screen from './src/Screens/Sms_Screen';
import Twitter_Screen from './src/Screens/Twitter_Screen';
import Facebook_Screen from './src/Screens/Facebook_Screen';
import SCREEN_TITTLE_CONFIG from './src/Global Config/Screen_Tittle';
import Vcard_Screen from './src/Screens/Vcard_Screen';
import Dashboard_Screen from './src/Screens/Home_Screen';
import Create_Screen from './src/Screens/Create_Screen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerComponent() {
  return (
    <Drawer.Navigator
      drawerContent={props => <Custom_Drawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#00bfff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontFamily: 'DMSans-Bold',
          fontSize: 15,
        },
        headerTintColor: 'white',
      }}>
      <Drawer.Screen
        name={NAVIGATION_STRING_CONSTANTS.home_screen}
        component={Dashboard_Screen}
        options={{
          title: SCREEN_TITTLE_CONFIG.dashboard_screen_tittle,
          headerTitleStyle: {fontFamily: 'DMSans-Bold'},
          headerTitleAlign: 'center',
          headerShown: true,
          headerStyle: {backgroundColor: '#00bfff'},
          drawerIcon: ({focused}) => (
            <Image
              source={require('./src/assets/home_1.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? '#00bfff' : '#333',
              }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={NAVIGATION_STRING_CONSTANTS.create_screen}
        component={Create_Screen}
        options={{
          title: SCREEN_TITTLE_CONFIG.create_screen_tittle,
          headerTitleStyle: {fontFamily: 'DMSans-Bold'},
          headerTitleAlign: 'center',
          headerShown: true,
          headerStyle: {backgroundColor: '#00bfff'},
          drawerIcon: ({focused}) => (
            <Image
              source={require('./src/assets/create.png')}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? '#00bfff' : '#333',
              }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={NAVIGATION_STRING_CONSTANTS.splash_screen}
          component={Splash_Screen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NAVIGATION_STRING_CONSTANTS.login_screen}
          component={Login_Screen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NAVIGATION_STRING_CONSTANTS.sign_up_screen}
          component={SignUp_Screen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Root"
          component={DrawerComponent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={NAVIGATION_STRING_CONSTANTS.url_screen}
          component={Url_Screen}
          options={{
            title: SCREEN_TITTLE_CONFIG.url_screen_tittle,
            headerShown: true,
            headerStyle: {
              backgroundColor: '#00bfff',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'DMSans-Bold',
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen
          name={NAVIGATION_STRING_CONSTANTS.text_screen}
          component={Text_Screen}
          options={{
            title: SCREEN_TITTLE_CONFIG.text_screen_tittle,
            headerShown: true,
            headerStyle: {
              backgroundColor: '#00bfff',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'DMSans-Bold',
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen
          name={NAVIGATION_STRING_CONSTANTS.email_screen}
          component={Email_Screen}
          options={{
            title: SCREEN_TITTLE_CONFIG.email_screen_tittle,
            headerShown: true,
            headerStyle: {
              backgroundColor: '#00bfff',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'DMSans-Bold',
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen
          name={NAVIGATION_STRING_CONSTANTS.sms_screen}
          component={Sms_Screen}
          options={{
            title: SCREEN_TITTLE_CONFIG.sms_screen_tittle,
            headerShown: true,
            headerStyle: {
              backgroundColor: '#00bfff',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'DMSans-Bold',
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen
          name={NAVIGATION_STRING_CONSTANTS.v_card_screen}
          component={Vcard_Screen}
          options={{
            title: SCREEN_TITTLE_CONFIG.v_card_screen_tittle,
            headerShown: true,
            headerStyle: {
              backgroundColor: '#00bfff',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'DMSans-Bold',
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen
          name={NAVIGATION_STRING_CONSTANTS.twitter_screen}
          component={Twitter_Screen}
          options={{
            title: SCREEN_TITTLE_CONFIG.twitter_screen_tittle,
            headerShown: true,
            headerStyle: {
              backgroundColor: '#00bfff',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'DMSans-Bold',
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen
          name={NAVIGATION_STRING_CONSTANTS.facebook_screen}
          component={Facebook_Screen}
          options={{
            title: SCREEN_TITTLE_CONFIG.facebook_screen_tittle,
            headerShown: true,
            headerStyle: {
              backgroundColor: '#00bfff',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'DMSans-Bold',
              fontSize: 20,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
