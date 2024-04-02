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
  BackHandler,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import URL_CONFIG from '../Global Config/Url_Config';
import STRING_CONSTANTS from '../Global Config/Strings';

const SignUp_Screen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [conformPassword, setConformPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // Hook for Android back button press event

  useFocusEffect(
    useCallback(() => {
      // When user Back Navigation
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          navigation.goBack();
          return true;
        },
      );
      return () => backHandler.remove();
    }, []),
  );

  //   const Submit = async () => {
  //     if (!username) {
  //       Alert.alert('Please Enter Valid Username.');
  //     } else if (!password) {
  //       Alert.alert('Please Enter Valid Password.');
  //     } else {
  //       setLoading(true);
  //       try {
  //         const response = await fetch(
  //           URL_CONFIG.Url +
  //             'en/api/login?username=' +
  //             username +
  //             '&password=' +
  //             password,
  //           {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({username: username, password: password}),
  //           },
  //         );

  //         const data = await response.json();
  //         setLoading(false);
  //         if (data.type == 'success') {
  //           var userData = {
  //             scannerName: data.scannerName,
  //             username: data.username,
  //             organizerName: data.organizerName,
  //             organizerLogo: data.organizerLogo,
  //           };
  //           await AsyncStorage.setItem('apiKey', data.apiKey);
  //           await AsyncStorage.setItem('username', username);
  //           await AsyncStorage.setItem('password', password);
  //           await AsyncStorage.setItem('userData', JSON.stringify(userData));
  //           await AsyncStorage.setItem(
  //             'eventsData',
  //             JSON.stringify(data.eventDatesArray),
  //           );
  //           navigation.navigate('Root', {screen: 'Event Screen'});
  //         } else if (data.type == 'error') {
  //           Alert.alert(data.message);
  //         }
  //       } catch (error) {
  //         setLoading(false);
  //         Alert.alert(
  //           'Error',
  //           'An error occurred while processing your request.',
  //           [{text: 'OK', onPress: () => ''}],
  //         );
  //       }
  //     }
  //   };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground
        source={require('../assets/bg_1.png')}
        style={styles.backgroundImage}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled">
          <TouchableOpacity
            style={{
              marginRight: 'auto',
              marginVertical: 8,
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{
                width: 60,
                height: 20,
                tintColor: '#fff',
                marginVertical: 15,
              }}
              source={require('../assets/back.png')}
            />
          </TouchableOpacity>
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
            <TextInput
              label="Conform Password"
              value={conformPassword}
              autoCapitalize="none"
              secureTextEntry={secureTextEntry}
              onChangeText={text => setConformPassword(text)}
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
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Loading...</Text>
          <ActivityIndicator size="large" color="#5eb2d6" />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flexGrow: 1,
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
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
    color: '#000000',
    textAlign: 'center',
    paddingHorizontal: 15,
  },
});

export default SignUp_Screen;
