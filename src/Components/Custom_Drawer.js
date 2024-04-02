import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {logOut} from '../Global Config/Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NAVIGATION_STRING_CONSTANTS from '../Navigation/Navigation';
import {DrawerActions} from '@react-navigation/native';
import STRING_CONSTANTS from '../Global Config/Strings';

const Custom_Drawer = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  async function logOutApi() {
    Alert.alert(
      STRING_CONSTANTS.alert_box_tittle,
      STRING_CONSTANTS.logOut_alert_box,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            setLoading(true);
            var userToken = await AsyncStorage.getItem('userToken');
            logOut(userToken)
              .then(response => {
                if (response.success == 'true') {
                  navigation.dispatch(DrawerActions.closeDrawer());
                  AsyncStorage.clear();
                  navigation.navigate(NAVIGATION_STRING_CONSTANTS.login_screen);
                }
              })
              .catch(error => {
                console.error('API error:', error);
              })
              .finally(() => {
                setLoading(false);
              });
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  }

  return (
    <DrawerContentScrollView
      contentContainerStyle={{paddingTop: 0, margin: 0}}
      {...props}>
      <Image
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          width: 200,
          height: 110,
          resizeMode: 'contain',
          marginTop: 25,
        }}
        source={require('../assets/qr-code.png')}
      />
      <Text
        style={{
          color: '#666666',
          fontSize: 25,
          fontFamily: 'DMSans-Bold',
          textAlign: 'center',
          paddingTop: 5,
          paddingBottom: 30,
        }}>
        {STRING_CONSTANTS.app_splash_name}
      </Text>
      <DrawerItemList {...props} />
      <TouchableOpacity
        onPress={logOutApi}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
          marginVertical: 10,
        }}>
        <Image
          style={{
            width: 20,
            height: 20,
            resizeMode: 'contain',
          }}
          source={require('../assets/logout.png')}
        />
        <Text
          style={{
            color: '#000000',
            fontSize: 15,
            fontFamily: 'DMSans-Bold',
            marginHorizontal: 30,
          }}>
          Log Out
        </Text>
      </TouchableOpacity>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={styles.modalMainContainer}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Loading...</Text>
            <ActivityIndicator size={30} color="#5eb2d6" />
          </View>
        </View>
      </Modal>
    </DrawerContentScrollView>
  );
};

export default Custom_Drawer;
const styles = StyleSheet.create({
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
