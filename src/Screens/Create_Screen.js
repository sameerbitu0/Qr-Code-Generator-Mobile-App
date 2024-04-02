import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import SCREEN_TITTLE_CONFIG from '../Global Config/Screen_Tittle';
import Bottom_Tab_Bar from '../Components/Bottom_Tab_Bar';
import NAVIGATION_STRING_CONSTANTS from '../Navigation/Navigation';

const Create_Screen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <SafeAreaView style={styles.scrMainContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.buttonMainContainer}
            onPress={() =>
              navigation.navigate(NAVIGATION_STRING_CONSTANTS.url_screen)
            }>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/url.png')}
                style={styles.image}
              />
            </View>
            <Text
              style={[
                styles.text,
                {
                  marginHorizontal: 20,
                  color: '#666666',
                  fontFamily: 'DMSans-Medium',
                },
              ]}>
              {SCREEN_TITTLE_CONFIG.url_screen_tittle}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonMainContainer}
            onPress={() =>
              navigation.navigate(NAVIGATION_STRING_CONSTANTS.text_screen)
            }>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/text.png')}
                style={styles.image}
              />
            </View>
            <Text
              style={[
                styles.text,
                {
                  marginHorizontal: 20,
                  color: '#666666',
                  fontFamily: 'DMSans-Medium',
                },
              ]}>
              {SCREEN_TITTLE_CONFIG.text_screen_tittle}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonMainContainer}
            onPress={() =>
              navigation.navigate(NAVIGATION_STRING_CONSTANTS.email_screen)
            }>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/email.png')}
                style={styles.image}
              />
            </View>
            <Text
              style={[
                styles.text,
                {
                  marginHorizontal: 20,
                  color: '#666666',
                  fontFamily: 'DMSans-Medium',
                },
              ]}>
              {SCREEN_TITTLE_CONFIG.email_screen_tittle}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonMainContainer}
            onPress={() =>
              navigation.navigate(NAVIGATION_STRING_CONSTANTS.sms_screen)
            }>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/chat.png')}
                style={styles.image}
              />
            </View>
            <Text
              style={[
                styles.text,
                {
                  marginHorizontal: 20,
                  color: '#666666',
                  fontFamily: 'DMSans-Medium',
                },
              ]}>
              {SCREEN_TITTLE_CONFIG.sms_screen_tittle}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonMainContainer}
            onPress={() =>
              navigation.navigate(NAVIGATION_STRING_CONSTANTS.v_card_screen)
            }>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/card.png')}
                style={styles.image}
              />
            </View>
            <Text
              style={[
                styles.text,
                {
                  marginHorizontal: 20,
                  color: '#666666',
                  fontFamily: 'DMSans-Medium',
                },
              ]}>
              {SCREEN_TITTLE_CONFIG.v_card_screen_tittle}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonMainContainer}
            onPress={() =>
              navigation.navigate(NAVIGATION_STRING_CONSTANTS.twitter_screen)
            }>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/twitter.png')}
                style={styles.image}
              />
            </View>
            <Text
              style={[
                styles.text,
                {
                  marginHorizontal: 20,
                  color: '#666666',
                  fontFamily: 'DMSans-Medium',
                },
              ]}>
              {SCREEN_TITTLE_CONFIG.twitter_screen_tittle}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonMainContainer}
            onPress={() =>
              navigation.navigate(NAVIGATION_STRING_CONSTANTS.facebook_screen)
            }>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/facebook_2.png')}
                style={styles.image}
              />
            </View>
            <Text
              style={[
                styles.text,
                {
                  marginHorizontal: 20,
                  color: '#666666',
                  fontFamily: 'DMSans-Medium',
                },
              ]}>
              {SCREEN_TITTLE_CONFIG.facebook_screen_tittle}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Bottom_Tab_Bar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default Create_Screen;

const styles = StyleSheet.create({
  scrMainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  buttonMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: '#cccccc',
  },
  text: {
    fontFamily: 'DMSans-Bold',
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
  },
  imageContainer: {
    backgroundColor: '#03a9f4',
    padding: 8,
    borderRadius: 50,
  },
  image: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
});
