import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  BackHandler,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {useState, useRef, useCallback, useEffect} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import CustomCheckbox from '../Components/CustomCheckbox';
import ColorPicker, {Panel1, Preview, HueSlider} from 'reanimated-color-picker';
import URL_CONFIG from '../Global Config/Url_Config';
import API_CONFIG from '../Global Config/Api_Config';
import STRING_CONSTANTS from '../Global Config/Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput as TextInputPaper} from 'react-native-paper';

const Facebook_Screen = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [galleryPhoto, setGalleryPhoto] = useState('');
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLogoComponent, setShowLogoComponent] = useState(false);
  const [showCustomDesignComponent, setShowCustomDesignComponent] =
    useState(false);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [imageSource, setImageSource] = useState();

  const [pickerModal, setPickerModal] = useState({
    gradientPickerModal: false,
    customEyePickerModal: false,
  });

  const [gradientPicker, setGradientPicker] = useState('vertical');
  const [customEyePicker, setCustomEyePicker] = useState('square');
  const [isChecked, setIsChecked] = useState(false);
  const [saveButton, setSaveButton] = useState(true);

  const [apiResponse, setApiResponse] = useState(
    'https://qrcode.logoflex.co.uk/assets/images/qrcode_logo.png',
  );

  const [showFunctions, setShowFunctions] = useState({
    single_color: false,
    gradient_color_1: false,
    gradient_color_2: false,
    eye_color_check: false,
    eye_color_1: false,
    eye_color_2: false,
    background_color: false,
  });

  const [apiVariable, setApiVariable] = useState({
    url: '',
    background_color: '#FFFFFF',
    color: 'single',
    single_color: '#000000',
    gradient_color_1: '#000000',
    gradient_color_2: '#f44336',
    type: gradientPicker,
    eye_color_check: isChecked,
    eye_color_1: '#000000',
    eye_color_2: '#000000',
    eye_style: 'square',
    style: 'square',
    logo_url: '',
    upload_logo: '',
  });

  const [temporaryVariable, setTemporaryVariable] = useState({
    background_color: '#FFFFFF',
    single_color: '#000000',
    gradient_color_1: '#000000',
    gradient_color_2: '#f44336',
    eye_color_1: '#000000',
    eye_color_2: '#000000',
  });

  useEffect(() => {
    scrollToTop();
    onScreenLoad();
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      scrollToTop();
      onScreenLoad();
    }, []),
  );

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

  // Function to scroll to the top
  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
  };

  // ON Screen load
  function onScreenLoad() {
    setGradientPicker('vertical');
    setCustomEyePicker('square');
    setGalleryPhoto('');
    setShowRemoveButton(false);
    setShowModal(false);

    setShowLogoComponent(false);
    setSelectedMethod(0);
    setIsChecked(false);
    setImageSource();
    setSaveButton(true);
    setApiResponse(
      'https://qrcode.logoflex.co.uk/assets/images/qrcode_logo.png',
    );
    setApiVariable({
      url: '',
      background_color: '#FFFFFF',
      color: 'single',
      single_color: '#000000',
      gradient_color_1: '#000000',
      gradient_color_2: '#0D47A1',
      type: gradientPicker,
      eye_color_check: isChecked,
      eye_color_1: '#000000',
      eye_color_2: '#f44336',
      eye_style: 'square',
      style: 'square',
      logo_url: '',
      upload_logo: '',
    });
    setShowFunctions({
      single_color: false,
      gradient_color_1: false,
      gradient_color_2: false,
      eye_color_check: false,
      eye_color_1: false,
      eye_color_2: false,
      background_color: false,
    });
    setTemporaryVariable({
      background_color: '#FFFFFF',
      single_color: '#000000',
      gradient_color_1: '#000000',
      gradient_color_2: '#f44336',
      eye_color_1: '#000000',
      eye_color_2: '#000000',
    });
  }

  // Toggle on press show select logo from gallery and icon

  const toggleSelectLogoComponent = () => {
    setShowLogoComponent(!showLogoComponent);

    setShowCustomDesignComponent(false);
  };

  // Toggle on press show select logo from gallery and icon

  const toggleShowCustomDesignComponent = () => {
    setShowCustomDesignComponent(!showCustomDesignComponent);
    setShowLogoComponent(false);
  };

  const onCloseColorModal = e => {
    // Check if the click target is the modal container
    if (e.target === e.currentTarget) {
      if (showFunctions.single_color === true) {
        showFunctions.single_color = false;
      } else if (showFunctions.gradient_color_1 === true) {
        showFunctions.gradient_color_1 = false;
      } else if (showFunctions.gradient_color_2 === true) {
        showFunctions.gradient_color_2 = false;
      } else if (showFunctions.eye_color_1 === true) {
        showFunctions.eye_color_1 = false;
      } else if (showFunctions.eye_color_2 === true) {
        showFunctions.eye_color_2 = false;
      } else if (showFunctions.background_color === true) {
        showFunctions.background_color = false;
      }
      setPickerModal({
        gradientPickerModal: false,
        customEyePickerModal: false,
      });
      setShowModal(false);
      setShowLogoComponent(false);
      setShowCustomDesignComponent(false);
    }
  };

  // Close color model without event handle

  const onCloseColorModalWithoutEvent = () => {
    if (showFunctions.single_color === true) {
      showFunctions.single_color = false;
      temporaryVariable.single_color = apiVariable.single_color;
    } else if (showFunctions.gradient_color_1 === true) {
      showFunctions.gradient_color_1 = false;
      temporaryVariable.gradient_color_1 = apiVariable.gradient_color_1;
    } else if (showFunctions.gradient_color_2 === true) {
      showFunctions.gradient_color_2 = false;
      temporaryVariable.gradient_color_2 = apiVariable.gradient_color_2;
    } else if (showFunctions.eye_color_1 === true) {
      showFunctions.eye_color_1 = false;
      temporaryVariable.eye_color_1 = apiVariable.eye_color_1;
    } else if (showFunctions.eye_color_2 === true) {
      showFunctions.eye_color_2 = false;
      temporaryVariable.eye_color_2 = apiVariable.eye_color_2;
    } else if (showFunctions.background_color === true) {
      showFunctions.background_color = false;
      temporaryVariable.background_color = apiVariable.background_color;
    }

    setShowModal(false);
  };

  // On press select modal color

  const onSelectModalColor = ({hex}) => {
    if (showFunctions.single_color === true) {
      console.log('Selected Single Color:', hex);
      temporaryVariable.single_color = hex;
    } else if (showFunctions.gradient_color_1 === true) {
      console.log('Selected gradient_color_1:', hex);
      temporaryVariable.gradient_color_1 = hex;
    } else if (showFunctions.gradient_color_2 === true) {
      console.log('Selected gradient_color_2:', hex);
      temporaryVariable.gradient_color_2 = hex;
    } else if (showFunctions.eye_color_1 === true) {
      console.log('Selected eye_color_1:', hex);
      temporaryVariable.eye_color_1 = hex;
    } else if (showFunctions.eye_color_2 === true) {
      console.log('Selected eye_color_2:', hex);
      temporaryVariable.eye_color_2 = hex;
    } else if (showFunctions.background_color === true) {
      console.log('Selected background_color:', hex);
      temporaryVariable.background_color = hex;
    }
  };

  // On press select close Modal

  const saveOnSelectColor = () => {
    if (showFunctions.single_color === true) {
      showFunctions.single_color = false;
    } else if (showFunctions.gradient_color_1 === true) {
      showFunctions.gradient_color_1 = false;
    } else if (showFunctions.gradient_color_2 === true) {
      showFunctions.gradient_color_2 = false;
    } else if (showFunctions.eye_color_1 === true) {
      showFunctions.eye_color_1 = false;
    } else if (showFunctions.eye_color_2 === true) {
      showFunctions.eye_color_2 = false;
    } else if (showFunctions.background_color === true) {
      showFunctions.background_color = false;
    }
    updateVariable();
    setShowModal(false);
  };

  // Update temporary color picker variable

  function updateVariable() {
    apiVariable.single_color = temporaryVariable.single_color;
    apiVariable.eye_color_1 = temporaryVariable.eye_color_1;
    apiVariable.eye_color_2 = temporaryVariable.eye_color_2;
    apiVariable.gradient_color_1 = temporaryVariable.gradient_color_1;
    apiVariable.gradient_color_2 = temporaryVariable.gradient_color_2;
    apiVariable.background_color = temporaryVariable.background_color;
  }

  // Path image select from folder
  const icons = [
    require('../assets/1.png'),
    require('../assets/2.png'),
    require('../assets/3.png'),
    require('../assets/4.png'),
    require('../assets/5.png'),
    require('../assets/6.png'),
    require('../assets/7.png'),
    require('../assets/8.png'),
    require('../assets/9.png'),
    require('../assets/10.png'),
    require('../assets/11.png'),
    require('../assets/12.png'),
    require('../assets/13.png'),
    require('../assets/14.png'),
    require('../assets/15.png'),
    require('../assets/16.png'),
    require('../assets/17.png'),
    require('../assets/18.png'),
    require('../assets/19.png'),
    require('../assets/20.png'),
    require('../assets/21.png'),
    require('../assets/22.png'),
    require('../assets/23.png'),
    require('../assets/24.png'),
    require('../assets/25.png'),
    require('../assets/26.png'),
  ];

  // Handle Icon Press set and Upload

  function handleIconPress(index) {
    apiVariable.upload_logo = '';
    setGalleryPhoto('');
    setShowRemoveButton(true);
    if (index == 0) {
      const newImageSource = require('../assets/1.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/1.png`;
    } else if (index == 1) {
      const newImageSource = require('../assets/2.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/2.png`;
    } else if (index == 2) {
      const newImageSource = require('../assets/3.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/3.png`;
    } else if (index == 3) {
      const newImageSource = require('../assets/4.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/4.png`;
    } else if (index == 4) {
      const newImageSource = require('../assets/5.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/5.png`;
    } else if (index == 5) {
      const newImageSource = require('../assets/6.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/6.png`;
    } else if (index == 6) {
      const newImageSource = require('../assets/7.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/7.png`;
    } else if (index == 7) {
      const newImageSource = require('../assets/8.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/8.png`;
    } else if (index == 8) {
      const newImageSource = require('../assets/9.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/9.png`;
    } else if (index == 9) {
      const newImageSource = require('../assets/10.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/10.png`;
    } else if (index == 10) {
      const newImageSource = require('../assets/11.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/11.png`;
    } else if (index == 11) {
      const newImageSource = require('../assets/12.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/12.png`;
    } else if (index == 12) {
      const newImageSource = require('../assets/13.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/13.png`;
    } else if (index == 13) {
      const newImageSource = require('../assets/14.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/14.png`;
    } else if (index == 14) {
      const newImageSource = require('../assets/15.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/15.png`;
    } else if (index == 15) {
      const newImageSource = require('../assets/16.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/16.png`;
    } else if (index == 16) {
      const newImageSource = require('../assets/17.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/17.png`;
    } else if (index == 17) {
      const newImageSource = require('../assets/18.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/19.png`;
    } else if (index == 18) {
      const newImageSource = require('../assets/19.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/20.png`;
    } else if (index == 19) {
      const newImageSource = require('../assets/20.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/20.png`;
    } else if (index == 20) {
      const newImageSource = require('../assets/21.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/21.png`;
    } else if (index == 21) {
      const newImageSource = require('../assets/22.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/22.png`;
    } else if (index == 22) {
      const newImageSource = require('../assets/23.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/23.png`;
    } else if (index == 23) {
      const newImageSource = require('../assets/24.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/24.png`;
    } else if (index == 24) {
      const newImageSource = require('../assets/25.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/25.png`;
    } else if (index == 25) {
      const newImageSource = require('../assets/26.png');
      setImageSource(newImageSource);
      apiVariable.logo_url = `assets/images/logo/26.png`;
    }
  }

  // Custom Eye Check box True and False toggle

  const toggleCustomEyeCheckbox = () => {
    setIsChecked(!isChecked);
  };

  // Image Convert to Base64

  const convertImageToBase64 = async imageUri => {
    try {
      const response = await RNFetchBlob.fs.readFile(imageUri, 'base64');
      return response;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  };

  // open Gallery and select image for logo qr code

  const openGallery = async () => {
    const options = {
      mediaType: 'photo',
    };
    const result = await launchImageLibrary(options);
    console.log('Result:', result);

    if (result.didCancel) {
      return;
    }

    if (result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];

      // Convert the selected image to base64
      const base64Image = await convertImageToBase64(selectedImage.uri);

      if (base64Image) {
        apiVariable.upload_logo = base64Image;
        apiVariable.logo_url = '';
      } else {
        console.warn('Error converting image to base64.');
      }
      setImageSource('');
      setGalleryPhoto(selectedImage.uri);
      setShowRemoveButton(true);
    } else {
      console.warn('No image selected.');
    }
  };

  // Remove icon and image

  const removeImage = () => {
    setImageSource('');
    setGalleryPhoto('');
    apiVariable.logo_url = '';
    apiVariable.upload_logo = '';
    setShowRemoveButton(false);
  };

  //// Generate QRCode API   ////

  const generateQRCode = async () => {
    var userToken = await AsyncStorage.getItem('userToken');
    const originalBearerToken = `Bearer ${userToken}`;
    const bearerToken = originalBearerToken.replace(/"/g, '');

    setShowLogoComponent(false);
    setShowCustomDesignComponent(false);
    setLoading(true);
    fetch(URL_CONFIG.url + API_CONFIG.url_api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: bearerToken,
      },
      body: JSON.stringify({
        url: apiVariable.url,
        background_color: apiVariable.background_color,
        color: apiVariable.color,
        single_color: apiVariable.single_color,
        gradient_color_1: apiVariable.gradient_color_1,
        gradient_color_2: apiVariable.gradient_color_2,
        type: gradientPicker,
        eye_color_check: isChecked,
        eye_color_1: apiVariable.eye_color_1,
        eye_color_2: apiVariable.eye_color_2,
        eye_style: customEyePicker,
        style: apiVariable.style,
        upload_logo: apiVariable.upload_logo,
        logo_url: apiVariable.logo_url,
      }),
    })
      .then(response => response.text())
      .then(text => {
        setLoading(false);
        setApiResponse(text);
        setSaveButton(true);
      })
      .catch(error => {
        setLoading(false);
        console.warn(error);
        Alert.alert('Error', STRING_CONSTANTS.login_false_alert_box, [
          {text: 'OK', onPress: () => ''},
        ]);
      });
  };

  //// Save QRCode API   ////

  const saveQRCode = async () => {
    var userToken = await AsyncStorage.getItem('userToken');
    const originalBearerToken = `Bearer ${userToken}`;
    const bearerToken = originalBearerToken.replace(/"/g, '');
    setShowLogoComponent(false);
    setShowCustomDesignComponent(false);
    setLoading(true);
    fetch(URL_CONFIG.url + API_CONFIG.save_qr_code_api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: bearerToken,
      },
      body: JSON.stringify({
        url: apiVariable.url,
        background_color: apiVariable.background_color,
        color: apiVariable.color,
        single_color: apiVariable.single_color,
        gradient_color_1: apiVariable.gradient_color_1,
        gradient_color_2: apiVariable.gradient_color_2,
        type: gradientPicker,
        eye_color_check: isChecked,
        eye_color_1: apiVariable.eye_color_1,
        eye_color_2: apiVariable.eye_color_2,
        eye_style: customEyePicker,
        style: apiVariable.style,
        upload_logo: apiVariable.upload_logo,
        logo_url: apiVariable.logo_url,
      }),
    })
      .then(response => response.text())
      .then(data => {
        setLoading(false);
        setSaveButton(false);
        Alert.alert(
          STRING_CONSTANTS.alert_box_tittle,
          'QR code saved successfully.',
          [{text: 'OK', onPress: () => ''}],
        );
      })
      .catch(error => {
        setLoading(false);
        console.warn(error);
        Alert.alert('Error', STRING_CONSTANTS.login_false_alert_box, [
          {text: 'OK', onPress: () => ''},
        ]);
      });
  };

  const downloadImage = () => {
    const imageURL =
      'https://qrcode.logoflex.co.uk/assets/images/qrcode_logo.png';
    const fileName = imageURL.split('/').pop();
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: RNFetchBlob.fs.dirs.DownloadDir + '/' + fileName,
        description: 'Image Downloaded',
      },
    })
      .fetch('GET', imageURL, {})
      .then(res => {
        console.log('Image downloaded to:', res.path());
      })
      .catch(error => {
        console.error('Error downloading image:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        enabled
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView ref={scrollViewRef}>
          <View style={styles.mainContainer}>
            <Image style={styles.qrCodeImage} source={{uri: apiResponse}} />
            <View style={styles.containerInRowStyle}>
              <TouchableOpacity
                // onPress={generateQRCode}
                activeOpacity={0.6}
                style={[
                  styles.mainButton,
                  {
                    flex: 0.5,
                    marginRight: 10,
                    justifyContent: 'center',
                    backgroundColor: '#8bc34a',
                  },
                ]}>
                <Text style={[styles.textMainButton, {color: '#fff'}]}>
                  {STRING_CONSTANTS.generate_qr_code_button}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={saveButton === true ? saveQRCode : downloadImage}
                activeOpacity={0.6}
                style={[
                  styles.mainButton,
                  {
                    flex: 0.5,
                    marginLeft: 10,
                    justifyContent: 'center',
                    backgroundColor: '#00bfff',
                  },
                ]}>
                <Text style={[styles.textMainButton, {color: '#fff'}]}>
                  {saveButton === true
                    ? STRING_CONSTANTS.save_qr_code_button
                    : STRING_CONSTANTS.download_qr_code_button}
                </Text>
              </TouchableOpacity>
            </View>
            <TextInputPaper
              label={STRING_CONSTANTS.your_facebook_url_label}
              style={styles.inputField}
              mode="outlined"
              theme={{
                colors: {
                  text: '#333',
                  primary: '#00bfff',
                  accent: '#00bfff',
                },
              }}
              placeholder="https://www.facebook.com"
              placeholderTextColor={'#b3b3b3'}
              keyboardType="url"
              onChangeText={text =>
                setApiVariable({
                  ...apiVariable,
                  url: text,
                })
              }
              value={apiVariable.url}
            />

            <View style={styles.rowContainerStyle}>
              <TouchableOpacity
                onPress={() => {
                  setApiVariable({...apiVariable, color: 'single'}) +
                    setSelectedMethod(0);
                }}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Image
                  style={styles.radioButtonImage}
                  source={
                    selectedMethod == 0
                      ? require('../assets/radio_2.png')
                      : require('../assets/radio_1.png')
                  }
                />
                <Text style={styles.radioButtonText}>
                  {STRING_CONSTANTS.single_color_button}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setApiVariable({...apiVariable, color: 'gradient'}) +
                    setSelectedMethod(1);
                }}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 5,
                }}>
                <Image
                  style={styles.radioButtonImage}
                  source={
                    selectedMethod == 1
                      ? require('../assets/radio_2.png')
                      : require('../assets/radio_1.png')
                  }
                />
                <Text style={styles.radioButtonText}>
                  {STRING_CONSTANTS.color_gradient_button}
                </Text>
              </TouchableOpacity>
            </View>

            {selectedMethod == 0 && (
              <View style={[styles.rowContainerStyle, {marginVertical: 10}]}>
                <TouchableOpacity
                  onPress={() => {
                    setShowFunctions({
                      ...showFunctions,
                      single_color: true,
                    }) + setShowModal(true);
                  }}
                  style={styles.colorSelectorButton}>
                  <View
                    style={{
                      backgroundColor: apiVariable.single_color,
                      padding: 5,
                    }}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.textMainButton,
                        {
                          fontFamily: 'DMSans-Medium',
                          color: '#fff',
                          fontSize: 12,
                        },
                      ]}>
                      {apiVariable.single_color}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flex: 1,
                  }}></View>
              </View>
            )}

            {selectedMethod == 1 && (
              <>
                <View
                  style={[
                    styles.rowContainerStyle,
                    {
                      marginVertical: 10,
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowFunctions({
                        ...showFunctions,
                        gradient_color_1: true,
                      }) + setShowModal(true);
                    }}
                    style={styles.colorSelectorButton}>
                    <View
                      style={{
                        backgroundColor: apiVariable.gradient_color_1,
                        padding: 5,
                      }}>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.textMainButton,
                          {
                            fontFamily: 'DMSans-Medium',
                            color: '#fff',
                            fontSize: 12,
                          },
                        ]}>
                        {apiVariable.gradient_color_1}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowFunctions({
                        ...showFunctions,
                        gradient_color_2: true,
                      }) + setShowModal(true);
                    }}
                    style={styles.colorSelectorButton}>
                    <View
                      style={{
                        backgroundColor: apiVariable.gradient_color_2,
                        padding: 5,
                      }}>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.textMainButton,
                          {
                            fontFamily: 'DMSans-Medium',
                            color: '#fff',
                            fontSize: 12,
                          },
                        ]}>
                        {apiVariable.gradient_color_2}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.dropDownMainContainer}
                  onPress={() =>
                    setPickerModal({...pickerModal, gradientPickerModal: true})
                  }>
                  <Text
                    style={[
                      styles.textMainButton,
                      {textTransform: 'capitalize'},
                    ]}>
                    {gradientPicker}
                  </Text>
                  <Image
                    style={{width: 20, height: 20}}
                    source={
                      pickerModal.gradientPickerModal == true
                        ? require('../assets/expand_less.png')
                        : require('../assets/expand_more.png')
                    }
                  />
                </TouchableOpacity>
              </>
            )}

            <CustomCheckbox
              label="Custom Eye Color"
              isChecked={isChecked}
              onToggle={toggleCustomEyeCheckbox}
            />
            {isChecked == true && (
              <>
                <View
                  style={[
                    styles.rowContainerStyle,
                    {
                      marginVertical: 10,
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowFunctions({
                        ...showFunctions,
                        eye_color_1: true,
                      }) + setShowModal(true);
                    }}
                    style={styles.colorSelectorButton}>
                    <View
                      style={{
                        backgroundColor: apiVariable.eye_color_1,
                        padding: 5,
                      }}>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.textMainButton,
                          {
                            fontFamily: 'DMSans-Medium',
                            color: '#fff',
                            fontSize: 12,
                          },
                        ]}>
                        {apiVariable.eye_color_1}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowFunctions({
                        ...showFunctions,
                        eye_color_2: true,
                      }) + setShowModal(true);
                    }}
                    style={styles.colorSelectorButton}>
                    <View
                      style={{
                        backgroundColor: apiVariable.eye_color_2,
                        padding: 5,
                      }}>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.textMainButton,
                          {
                            fontFamily: 'DMSans-Medium',
                            color: '#fff',
                            fontSize: 12,
                          },
                        ]}>
                        {apiVariable.eye_color_2}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.dropDownMainContainer}
                  onPress={() =>
                    setPickerModal({...pickerModal, customEyePickerModal: true})
                  }>
                  <Text
                    style={[
                      styles.textMainButton,
                      {textTransform: 'capitalize'},
                    ]}>
                    {customEyePicker}
                  </Text>
                  <Image
                    style={{width: 20, height: 20}}
                    source={
                      pickerModal.customEyePickerModal == true
                        ? require('../assets/expand_less.png')
                        : require('../assets/expand_more.png')
                    }
                  />
                </TouchableOpacity>
              </>
            )}

            <View
              style={{
                marginVertical: 5,
              }}>
              <View
                style={[
                  styles.rowContainerStyle,
                  {
                    marginVertical: 10,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    setShowFunctions({
                      ...showFunctions,
                      background_color: true,
                    }) + setShowModal(true);
                  }}
                  style={styles.colorSelectorButton}>
                  <View
                    style={{
                      backgroundColor: apiVariable.background_color,
                      padding: 6,
                    }}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.textMainButton,
                        {
                          fontFamily: 'DMSans-Bold',
                          color: 'black',
                          fontSize: 13,
                        },
                      ]}>
                      {STRING_CONSTANTS.background_color_button}{' '}
                      {apiVariable.background_color}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                styles.rowContainerStyle,
                {
                  gap: 10,
                },
              ]}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.mainButton, {flex: 1}]}
                onPress={toggleSelectLogoComponent}>
                <Text style={styles.textMainButton}>
                  {STRING_CONSTANTS.select_logo_button}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.mainButton, {flex: 1}]}
                onPress={toggleShowCustomDesignComponent}>
                <Text style={styles.textMainButton}>
                  {STRING_CONSTANTS.custom_design_button}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Screen Modals Section  */}

          <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={onCloseColorModal}>
            <View style={styles.modalContainer}>
              <View
                style={[styles.modalContent, {height: '55%', width: '80%'}]}>
                <ColorPicker
                  style={{
                    width: '90%',
                    height: 300,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                  value={
                    showFunctions.single_color === true
                      ? apiVariable.single_color
                      : '' || showFunctions.gradient_color_1 === true
                      ? apiVariable.gradient_color_1
                      : '' || showFunctions.gradient_color_2 === true
                      ? apiVariable.gradient_color_2
                      : '' || showFunctions.eye_color_1 === true
                      ? apiVariable.eye_color_1
                      : '' || showFunctions.eye_color_2 === true
                      ? apiVariable.eye_color_2
                      : '' || showFunctions.background_color === true
                      ? apiVariable.background_color
                      : ''
                  }
                  onComplete={onSelectModalColor}>
                  <Preview />
                  <Panel1 />
                  <HueSlider />
                </ColorPicker>
                <View style={styles.rowContainerStyle}>
                  <TouchableOpacity
                    style={[
                      styles.mainButton,
                      {
                        flex: 1,
                        justifyContent: 'center',
                        backgroundColor: '#00bfff',
                        marginHorizontal: 20,
                        paddingVertical: 10,
                      },
                    ]}
                    onPress={saveOnSelectColor}>
                    <Text
                      style={[
                        styles.textMainButton,
                        {color: '#fff', marginHorizontal: 0},
                      ]}>
                      Save
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.mainButton,
                      {
                        flex: 1,
                        justifyContent: 'center',
                        backgroundColor: '#e57373',
                        marginHorizontal: 20,
                        paddingVertical: 10,
                      },
                    ]}
                    onPress={onCloseColorModalWithoutEvent}>
                    <Text
                      style={[
                        styles.textMainButton,
                        {color: '#fff', marginHorizontal: 0},
                      ]}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={pickerModal.customEyePickerModal}
            onRequestClose={onCloseColorModal}>
            <TouchableWithoutFeedback onPress={onCloseColorModal}>
              <View style={styles.modalContainer}>
                <View
                  style={[styles.modalContent, {height: '20%', width: '80%'}]}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#000000',
                      fontFamily: 'DMSans-Bold',
                      marginHorizontal: 5,
                    }}>
                    Select Custom Eye Style Type
                  </Text>
                  <View style={{marginHorizontal: 15, marginVertical: 10}}>
                    <TouchableOpacity
                      onPress={() => {
                        setCustomEyePicker('square');
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 7,
                      }}>
                      <Image
                        style={styles.radioButtonImage}
                        source={
                          customEyePicker == 'square'
                            ? require('../assets/radio_2.png')
                            : require('../assets/radio_1.png')
                        }
                      />
                      <Text style={styles.radioButtonText}>Square</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setCustomEyePicker('circle');
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 7,
                      }}>
                      <Image
                        style={styles.radioButtonImage}
                        source={
                          customEyePicker == 'circle'
                            ? require('../assets/radio_2.png')
                            : require('../assets/radio_1.png')
                        }
                      />
                      <Text style={styles.radioButtonText}>Circle</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={pickerModal.gradientPickerModal}
            onRequestClose={onCloseColorModal}>
            <TouchableWithoutFeedback onPress={onCloseColorModal}>
              <View style={styles.modalContainer}>
                <View
                  style={[styles.modalContent, {height: '35%', width: '80%'}]}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#000000',
                      fontFamily: 'DMSans-Bold',
                      marginHorizontal: 5,
                    }}>
                    Select Style Type
                  </Text>

                  <View style={{marginHorizontal: 15, marginVertical: 10}}>
                    <TouchableOpacity
                      onPress={() => {
                        setGradientPicker('vertical');
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 7,
                      }}>
                      <Image
                        style={styles.radioButtonImage}
                        source={
                          gradientPicker == 'vertical'
                            ? require('../assets/radio_2.png')
                            : require('../assets/radio_1.png')
                        }
                      />
                      <Text style={styles.radioButtonText}>Vertical</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setGradientPicker('horizontal');
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 7,
                      }}>
                      <Image
                        style={styles.radioButtonImage}
                        source={
                          gradientPicker == 'horizontal'
                            ? require('../assets/radio_2.png')
                            : require('../assets/radio_1.png')
                        }
                      />
                      <Text style={styles.radioButtonText}>Horizontal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setGradientPicker('diagonal');
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 7,
                      }}>
                      <Image
                        style={styles.radioButtonImage}
                        source={
                          gradientPicker == 'diagonal'
                            ? require('../assets/radio_2.png')
                            : require('../assets/radio_1.png')
                        }
                      />
                      <Text style={styles.radioButtonText}>Diagonal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setGradientPicker('inverse_diagonal');
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 7,
                      }}>
                      <Image
                        style={styles.radioButtonImage}
                        source={
                          gradientPicker == 'inverse_diagonal'
                            ? require('../assets/radio_2.png')
                            : require('../assets/radio_1.png')
                        }
                      />
                      <Text style={styles.radioButtonText}>
                        Inverse Diagonal
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setGradientPicker('radial');
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 7,
                      }}>
                      <Image
                        style={styles.radioButtonImage}
                        source={
                          gradientPicker == 'radial'
                            ? require('../assets/radio_2.png')
                            : require('../assets/radio_1.png')
                        }
                      />
                      <Text style={styles.radioButtonText}>Radial</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Modal
            visible={showLogoComponent}
            animationType="fade"
            transparent={true}>
            <TouchableWithoutFeedback onPress={onCloseColorModal}>
              <View style={styles.modalContainer}>
                <View
                  style={[styles.modalContent, {height: '65%', width: '90%'}]}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#f1f3eb',
                        padding: 15,
                        flex: 0.5,
                        borderWidth: 0.5,
                        borderColor: '#CCCCCC',
                      }}>
                      {galleryPhoto ? (
                        <Image
                          style={{width: 80, height: 80, alignSelf: 'center'}}
                          source={{uri: galleryPhoto}}
                        />
                      ) : (
                        <>
                          {imageSource ? (
                            <Image
                              style={{
                                width: 80,
                                height: 80,
                                alignSelf: 'center',
                              }}
                              source={imageSource}
                            />
                          ) : (
                            <Image
                              style={{
                                width: 80,
                                height: 80,
                                alignSelf: 'center',
                              }}
                              source={require('../assets/no_logo.png')}
                            />
                          )}
                        </>
                      )}
                    </View>
                    <View
                      style={{
                        marginHorizontal: 10,
                        marginVertical: 5,
                        flex: 1,
                      }}>
                      <TouchableOpacity
                        onPress={openGallery}
                        style={[
                          styles.addAndRemoveLogoButton,
                          {
                            backgroundColor: '#00bfff',
                          },
                        ]}>
                        <Text style={styles.addAndRemoveLogoText}>
                          Add Logo
                        </Text>
                      </TouchableOpacity>
                      {showRemoveButton && (
                        <TouchableOpacity
                          onPress={removeImage}
                          style={[
                            styles.addAndRemoveLogoButton,
                            {
                              backgroundColor: '#8bc34a',
                            },
                          ]}>
                          <Text style={styles.addAndRemoveLogoText}>
                            Remove Logo
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      marginBottom: 5,
                    }}>
                    {icons.map((icon, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleIconPress(index)}>
                        <Image
                          style={{width: 40, height: 40, margin: 5}}
                          source={icon}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Modal
            visible={showCustomDesignComponent}
            animationType="fade"
            transparent={true}>
            <TouchableWithoutFeedback onPress={onCloseColorModal}>
              <View style={styles.modalContainer}>
                <View
                  style={[styles.modalContent, {height: '20%', width: '80%'}]}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#000000',
                      fontFamily: 'DMSans-Bold',
                      marginHorizontal: 5,
                    }}>
                    Body Shape
                  </Text>
                  <View style={{marginHorizontal: 15, marginVertical: 10}}>
                    <TouchableOpacity
                      onPress={() => {
                        setApiVariable({...apiVariable, style: 'square'});
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
                      <Image
                        style={styles.radioButtonImage}
                        source={
                          apiVariable.style == 'square'
                            ? require('../assets/radio_2.png')
                            : require('../assets/radio_1.png')
                        }
                      />
                      <Text style={styles.radioButtonText}>Square</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setApiVariable({...apiVariable, style: 'dot'});
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
                      <Image
                        style={styles.radioButtonImage}
                        source={
                          apiVariable.style == 'dot'
                            ? require('../assets/radio_2.png')
                            : require('../assets/radio_1.png')
                        }
                      />
                      <Text style={styles.radioButtonText}>Dot</Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Facebook_Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  qrCodeImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: 10,
  },
  containerInRowStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  inputField: {
    backgroundColor: '#fff',
    marginVertical: 10,
    fontSize: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginVertical: 8,
    borderColor: '#cccccc',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 5,
  },
  textMainButton: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
  },
  radioButtonText: {
    marginHorizontal: 10,
    fontSize: 15,
    color: '#000000',
    fontFamily: 'DMSans-Medium',
  },
  dropDownMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginTop: 5,
    marginHorizontal: 5,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.1,
    elevation: 1,
  },
  addAndRemoveLogoButton: {
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  addAndRemoveLogoText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'DMSans-Bold',
  },
  rowContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioButtonImage: {
    width: 20,
    height: 20,
    tintColor: '#03A9F4',
    resizeMode: 'cover',
  },
  colorSelectorButton: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#b3b3b3',
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});
