import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NAVIGATION_STRING_CONSTANTS from '../Navigation/Navigation';
import STRING_CONSTANTS from '../Global Config/Strings';
import {logOut} from '../Global Config/Utils';
import {useNavigation} from '@react-navigation/native';

const Bottom_Tab_Bar = ({activeTab, setActiveTab}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const tabs = [
    {name: 'Home', icon: require('../assets/home_1.png')},
    {name: 'Create', icon: require('../assets/edit_1.png')},
    {name: 'History', icon: require('../assets/history.png')},
    {name: 'Logout', icon: require('../assets/logout.png')},
  ];

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

  const handleTabPress = index => {
    if (index === 0) {
      navigation.navigate(NAVIGATION_STRING_CONSTANTS.home_screen);
    } else if (index === 1) {
      navigation.navigate(NAVIGATION_STRING_CONSTANTS.create_screen);
    } else if (index === 2) {
    } else if (index === 3) {
      logOutApi();
    } else {
      setActiveTab(index);
    }
  };

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.tab]}
          onPress={() => handleTabPress(index)}>
          <Image
            source={tab.icon}
            style={[
              styles.tabIcon,
              index === activeTab ? styles.activeTabIcon : null,
            ]}
          />
          <Text
            style={[
              styles.tabText,
              index === activeTab ? styles.activeTabText : null,
            ]}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={styles.modalMainContainer}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Loading...</Text>
            <ActivityIndicator size={30} color="#5eb2d6" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: '9%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderColor: '#cccccc',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
  },
  activeTabIcon: {
    width: 24,
    height: 24,
    tintColor: '#03a9f4',
    resizeMode: 'cover',
  },
  tabText: {
    fontFamily: 'DMSans-Bold',
    fontSize: 15,
    color: '#333333',
  },
  activeTabText: {
    color: '#03a9f4',
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

export default Bottom_Tab_Bar;
