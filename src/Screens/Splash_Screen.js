import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Easing,
  SafeAreaView,
} from 'react-native';
import NAVIGATION_STRING_CONSTANTS from '../Navigation/Navigation';
import STRING_CONSTANTS from '../Global Config/Strings';
import API_CONFIG from '../Global Config/Api_Config';
import URL_CONFIG from '../Global Config/Url_Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash_Screen = ({navigation}) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    listQRCode();
  }, []);

  const listQRCode = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        const originalBearerToken = `Bearer ${userToken.replace(/"/g, '')}`;
        const options = {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
            Authorization: originalBearerToken,
          },
        };
        const response = await fetch(
          URL_CONFIG.url + API_CONFIG.qr_list_api,
          options,
        );
        const responseJson = await response.json();
        if (responseJson.success === true) {
          navigation.navigate('Root', {
            screen: NAVIGATION_STRING_CONSTANTS.home_screen,
          });
        } else {
          await AsyncStorage.clear();
          console.log('AsyncStorage cleared successfully.');
          navigation.navigate(NAVIGATION_STRING_CONSTANTS.login_screen);
        }
      } else {
        navigation.navigate(NAVIGATION_STRING_CONSTANTS.login_screen);
      }
    } catch (error) {
      console.error('Error in listQRCode:', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}>
          <Image
            source={require('../assets/qr-code.png')}
            style={[styles.logo]}
          />
          <Text style={styles.title}>{STRING_CONSTANTS.app_splash_name}</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default Splash_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    alignSelf: 'center',
    width: 200,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    color: '#4d4d4d',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'DMSans-Bold',
  },
});
