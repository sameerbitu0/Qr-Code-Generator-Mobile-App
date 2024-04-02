import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  View,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
  Modal,
  ActivityIndicator,
  Alert,
  BackHandler,
  Platform,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import NAVIGATION_STRING_CONSTANTS from '../Navigation/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import STRING_CONSTANTS from '../Global Config/Strings';
import {login} from '../Global Config/Utils';

const Login_Screen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // Function to handle the hardware back button press for Android
  const handleAndroidBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  // Hook for Android back button press event
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === 'android') {
        BackHandler.addEventListener(
          'hardwareBackPress',
          handleAndroidBackButton,
        );
      }
      return () => {
        if (Platform.OS === 'android') {
          BackHandler.removeEventListener(
            'hardwareBackPress',
            handleAndroidBackButton,
          );
        }
      };
    }, []),
  );

  // user login api function
  const signIn = async () => {
    if (!username) {
      Alert.alert('Please Enter a Valid Username.');
    } else if (!password) {
      Alert.alert('Please Enter a Valid Password.');
    } else {
      setLoading(true);
      try {
        const apiResponse = await login(username, password);
        setLoading(false);
        if (apiResponse.success === true) {
          await AsyncStorage.setItem('userToken', apiResponse.token);
          navigation.navigate('Root', {
            screen: NAVIGATION_STRING_CONSTANTS.home_screen,
          });
        } else {
          Alert.alert(apiResponse.message);
        }
      } catch (error) {
        setLoading(false);
        console.error('API error:', error);
        Alert.alert('Error', 'An error occurred while signing in.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.MainContainer}>
      <ImageBackground
        source={require('../assets/bg_1.png')}
        style={styles.backgroundImage}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled">
          <Image
            source={require('../assets/qr-code.png')}
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>
            {STRING_CONSTANTS.app_main_tittle_text}
          </Text>
          <View style={styles.formContainer}>
            <TextInput
              label="Username"
              value={username}
              onChangeText={text => setUsername(text)}
              style={styles.input}
              theme={{
                colors: {
                  text: '#00bfff',
                  primary: '#00bfff',
                  accent: '#00bfff',
                },
              }}
            />
            <TextInput
              label="Password"
              value={password}
              autoCapitalize="none"
              secureTextEntry={secureTextEntry}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? 'eye-off' : 'eye'}
                  onPress={() => {
                    setSecureTextEntry(!secureTextEntry);
                  }}
                />
              }
              theme={{
                colors: {
                  text: '#00bfff',
                  primary: '#00bfff',
                  accent: '#00bfff',
                },
              }}
            />
            <TouchableOpacity>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: '#252525',
                    textAlign: 'center',
                    fontFamily: 'DMSans-Medium',
                    textAlign: 'right',
                  },
                ]}>
                {STRING_CONSTANTS.forgot_password_text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={signIn}>
              <Text style={styles.buttonText}>SIGN IN</Text>
              <Image
                source={require('../assets/login.png')}
                style={styles.inputIconLogin}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.buttonText,
                {
                  color: '#333333',
                  textAlign: 'center',
                  fontFamily: 'DMSans-Medium',
                },
              ]}>
              Or
            </Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity>
                <Image
                  source={require('../assets/1.png')}
                  style={styles.socialButton}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../assets/facebook.png')}
                  style={styles.socialButton}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.socialButtons}>
            <Text
              style={[
                styles.buttonText,
                {
                  color: '#555555',
                  textAlign: 'center',
                  fontFamily: 'DMSans-Medium',
                },
              ]}>
              {STRING_CONSTANTS.dont_have_an_account_text}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(NAVIGATION_STRING_CONSTANTS.sign_up_screen)
              }>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: '#00bfff',
                    textAlign: 'center',
                    fontFamily: 'DMSans-Bold',
                    paddingLeft: 5,
                  },
                ]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={styles.modalMainContainer}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Loading...</Text>
            <ActivityIndicator size={30} color="#00bfff" />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 120,
    height: 120,
  },
  logoText: {
    fontFamily: 'DMSans-Bold',
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
    paddingTop: 15,
  },
  formContainer: {
    padding: 20,
    borderRadius: 10,
    width: deviceWidth * 0.9,
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginVertical: 20,
    fontFamily: 'DMSans-Medium',
  },
  button: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#00bfff',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 12,
  },
  buttonText: {
    fontFamily: 'DMSans-Bold',
    color: '#ffffff',
    fontSize: 15,
  },
  inputIconLogin: {
    tintColor: 'white',
    width: 18,
    height: 18,
    marginRight: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  socialButton: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },

  modalMainContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
    color: '#000000',
    textAlign: 'center',
    paddingHorizontal: 15,
  },
});

export default Login_Screen;
