import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Modal,
  ActivityIndicator,
  BackHandler,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  RefreshControl,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import URL_CONFIG from '../Global Config/Url_Config';
import API_CONFIG from '../Global Config/Api_Config';
import STRING_CONSTANTS from '../Global Config/Strings';
import Bottom_Tab_Bar from '../Components/Bottom_Tab_Bar';

const Dashboard_Screen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(0);

  const [apiResponse, setApiResponse] = useState([]);
  const [modal, setModal] = useState(false);
  const [editUrl, setEditUrl] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    onScreenLoad();
    listQRCode();
  }, []);

  useFocusEffect(
    useCallback(() => {
      onScreenLoad();
      listQRCode();
    }, []),
  );

  // ON Screen load on refresh screen
  function onScreenLoad() {
    setActiveTab(0);
    setApiResponse([]);
  }

  const handleAndroidBackButton = () => {
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
      return true;
    }
    return false;
  };

  // Hook for Android back button press event

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener(
        'hardwareBackPress',
        handleAndroidBackButton,
      );
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          handleAndroidBackButton,
        );
      };
    }, []),
  );

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Dismiss Keyboard when on press modal Touchable Without Feedback

  const dismissKeyboard = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss();
    } else {
      setModal(false);
    }
  };

  // List Qr code from Api

  const listQRCode = async () => {
    var userToken = await AsyncStorage.getItem('userToken');
    const originalBearerToken = `Bearer ${userToken}`;
    const bearerToken = originalBearerToken.replace(/"/g, '');
    setLoading(true);
    var options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: bearerToken,
      },
    };
    await fetch(URL_CONFIG.url + API_CONFIG.qr_list_api, options)
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false);
        const newData = responseJson;
        if (newData.success === true) {
          setApiResponse(newData['QR Code']);
        } else if (newData.success === false) {
        }
      })
      .catch(error => {
        console.warn(error);
      });
  };

  // Open update data Modal

  const openModal = item => {
    setEditUrl(item.url);
    setModal(true);
  };

  // update Url Api
  const updateUrl = () => {};

  /**
   * @Download Image Qr code
   */

  const checkPermission = async item => {
    if (Platform.OS === 'ios') {
      downloadImage(item);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadImage(item);
        } else {
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const downloadImage = item => {
    setLoading(true);
    const imagePath = `https://qrcode.logoflex.co.uk/assets/qrcodes/${item.image}`;
    let date = new Date();
    let image_URL = imagePath;
    let ext = getExtension(image_URL);
    ext = '.' + ext[0];

    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        setLoading(false);
        alert('Image Downloaded Successfully.');
      });
  };

  const getExtension = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.QRCountContainer}>
        <Text style={[styles.Text, {fontFamily: 'DMSans-Bold'}]}>
          {STRING_CONSTANTS.qr_code_found_text} {apiResponse.length}
        </Text>
      </View>
      {apiResponse.length > 0 && (
        <FlatList
          data={apiResponse}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={listQRCode} />
          }
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => openModal(item)}
              style={styles.MainContainer}>
              <Image
                style={[styles.Image, {flex: 0.3}]}
                source={{
                  uri: `https://qrcode.logoflex.co.uk/assets/qrcodes/${item.image}`,
                }}
              />
              <Text
                numberOfLines={1}
                style={[
                  styles.Text,
                  {
                    flex: 1.5,
                    color: '#555555',
                    fontSize: 15,
                    marginHorizontal: 10,
                  },
                ]}>
                {item.url}
              </Text>

              <TouchableOpacity
                onPress={() => checkPermission(item)}
                style={{flex: 0.3}}>
                <Image
                  source={require('../assets/downloads.png')}
                  style={[
                    styles.Image,
                    {height: 25, width: 25, tintColor: '#5f7d95'},
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openModal(item)}
                style={{flex: 0.5}}>
                <Image
                  source={require('../assets/edit.png')}
                  style={[
                    styles.Image,
                    {height: 25, width: 25, tintColor: '#0ab39c'},
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{flex: 0.1, marginHorizontal: 5}}>
                <Image
                  source={require('../assets/delete.png')}
                  style={[
                    styles.Image,
                    {height: 25, width: 25, tintColor: '#f06548'},
                  ]}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {apiResponse.length == 0 && (
          <Text
            numberOfLines={1}
            style={[
              styles.Text,
              {
                color: '#555555',
                fontSize: 20,
                textAlign: 'center',
                fontFamily: 'DMSans-Bold',
              },
            ]}>
            {STRING_CONSTANTS.no_qr_code_text}
          </Text>
        )}
      </View>
      <Modal animationType="fade" transparent={true} visible={modal}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.ModalMainContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.ModalContainer}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'DMSans-Bold',
                    color: '#000',
                    marginBottom: 10,
                  }}>
                  {STRING_CONSTANTS.update_url_text}
                </Text>
                <TextInput
                  style={styles.MainInputField}
                  placeholder="Enter new URL"
                  value={editUrl}
                  onChangeText={text => setEditUrl(text)}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginVertical: 20,
                  }}>
                  <TouchableOpacity
                    onPress={updateUrl}
                    style={[
                      styles.ModalButton,
                      {
                        backgroundColor: '#0ab39c',
                      },
                    ]}>
                    <Text style={styles.ModalText}>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModal(false)}
                    style={styles.ModalButton}>
                    <Text style={styles.ModalText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderWidth: 0.5,
              borderColor: 'gray',
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 30,
              paddingVertical: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'DMSans-Bold',
                color: '#000000',
                textAlign: 'center',
                paddingHorizontal: 15,
              }}>
              Loading...
            </Text>
            <ActivityIndicator size={30} color="#5eb2d6" />
          </View>
        </View>
      </Modal>
      <Bottom_Tab_Bar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default Dashboard_Screen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  QRCountContainer: {
    backgroundColor: '#333333',
    padding: 12,
  },
  Text: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'DMSans-Medium',
  },
  MainContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.3,
    elevation: 0,
  },
  Image: {
    alignSelf: 'center',
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  ModalMainContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  ModalContainer: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 20,
    width: '90%',
  },
  MainInputField: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    color: '#000',
    width: '100%',
  },
  ModalButton: {
    backgroundColor: '#f06548',
    padding: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  ModalText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'DMSans-Bold',
  },
});
