import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, SafeAreaView, Pressable, Image } from 'react-native';
import CountryCodeDropdownPicker from 'react-native-dropdown-country-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import { buttonC, buttonColor, buttonTextCol, iconColor } from '@/constants/Colors';
import Button from '@/components/Button';
import { PasswordInputField, TxtInputField } from '@/components/InputFields';
import { StatusBar } from 'expo-status-bar';
import { useSignUp } from '@clerk/clerk-expo';
import { isClerkAPIResponseError } from '@clerk/clerk-expo';

const boxShadow = {
  shadowColor: 'rgba(0,0,0,0.2)',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

const index = () => {
  const [user, setUser] = useState({
    name: '',
    countryCode: '+233',
    country: '',
    phone: '',
    password: '',
    showPassword: true
  });

  const [passwordFocused, setPasswordFocused] = useState('');

  //loading state of button
  const [isLoading, setIsLoading] = useState(false);

  //handle user change state
  const handleChange = (key) => (text) => {
    setUser({ ...user, [key]: text });
  };

  //handle show password
  const handleShowPassword = () => {
    setUser({ ...user, showPassword: !user.showPassword });
  };

  const handleIsFocused = () => {
    setPasswordFocused(true);
  };

  const handleOnBlur = () => {
    setPasswordFocused(false);
  };

  //sign up function using clerk
  const { isLoaded, signUp } = useSignUp();
  const [error, setError] = useState();

  const onSignUp = async () => {
    setError(null);
    
    if (!isLoaded && !signUp) return null

    setIsLoading(true); // Start loading
    try {
      await signUp.create({
        name: user.name,
        phoneNumber: `${user.countryCode}${user.phone}`,
        password: user.password,
      });
      await signUp.preparePhoneNumberVerification();
      console.log('Sign-up initiated successfully');
      router.push({
        pathname: '/(auth)/verify',
        params: {
          phoneNumber: `${user.countryCode}${user.phone}`,
          signUp, 
          isLoaded
        }
      })
    } 
    catch (err) {
      if (isClerkAPIResponseError(err)) {
        setError(err.errors?.map((e) => e.longMessage).join(', '));
      } 
      else {
        console.error('Unexpected error:', err);
      }
    } 
    finally {
      setIsLoading(false); // End loading
    }
  };

  // Validation function
  const isFormValid = () => {
    return user.name && user.phone && user.password;
  };

  // Auto-submit when all fields are filled
  useEffect(() => {
    if (isFormValid()) {
      onSignUp();
    }
  }, [user]);
  

  

 
  return (
    <>
      <StatusBar style='light' backgroundColor={buttonColor} />
      <SafeAreaView style={{ flex: 1 }}>
        {/* Fixed top header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>VibeChat</Text>
          <Text style={styles.headerSubtitle}>Create an account to continue</Text>
        </View>

        {/* Scrollable content */}
        <ScrollView contentContainerStyle={styles.scrollableContent}>
          <View style={styles.cont}>
            <View style={styles.box}>
              <View style={{ gap: 13 }}>
                <TxtInputField
                  icon={<FontAwesome name='user' color={buttonC} style={styles.iconStyle} />}
                  value={user.name}
                  onChangeText={handleChange('name')}
                  placeholder="Please enter your name or email"
                  keyboardType={'default'}
                />

                <CountryCodeDropdownPicker
                  selected={user.countryCode}
                  setSelected={(newCode) => {
                    setUser(prevState => ({
                      ...prevState,
                      countryCode: newCode,
                      phone: ''
                    }));
                  }}
                  setCountryDetails={(newCountry) => {
                    setUser(prevState => ({
                      ...prevState,
                      country: newCountry
                    }));
                  }}
                  phone={user.phone}
                  setPhone={(newPhone) => setUser({ ...user, phone: newPhone })}
                  countryCodeContainerStyles={[{ borderWidth: 0, height: 50 }, boxShadow]}
                  countryCodeTextStyles={{ fontSize: 13 }}
                  phoneInputProps={{
                    maxLength: 10,
                  }}
                  phoneStyles={[{
                    height: 50,
                    width: 263,
                    position: 'absolute',
                    left: 75,
                    backgroundColor: '#fff',
                    borderWidth: 0,
                    zIndex: 1,
                  }, boxShadow]}
                  searchStyles={{
                    width: 300
                  }}
                  dropdownStyles={{
                    width: 300,
                  }}
                />

                <PasswordInputField
                  icon={<Entypo name="lock" color={buttonC} style={[styles.iconStyle, { left: 5 }]} />}
                  keyboardType="default"
                  secureTextEntry={user.showPassword}
                  placeholder="Please enter your password"
                  value={user.password}
                  placeholderTextColor='#acadac'
                  onBlur={handleOnBlur}
                  onFocus={handleIsFocused}
                  onChangeText={handleChange('password')}
                  icon1={<Ionicons name={user.showPassword ? "eye-off-outline" : "eye-outline"} size={30} color={buttonC} style={styles.icon} />}
                  onPress={handleShowPassword}
                />

                <View style={{ marginTop: 20, flex: 1 }}>
                  <Button
                    text={"Register"}
                    isLoading={isLoading}
                    onPress={onSignUp}
                  />
                </View>
              </View>
            </View>

            <View style={styles.SignInCont}>
              <Text style={styles.text}>Don't have an account? Click here to</Text>
              <Pressable >
                <Text style={[styles.text, { color: buttonColor }]}>sign in</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
    backgroundColor: buttonColor,
    height: 120,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: buttonTextCol,
  },
  headerSubtitle: {
    fontSize: 18,
    color: buttonTextCol,
  },
  scrollableContent: {
    flexGrow: 1,
  },
  cont: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  box: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    borderRadius: 20,
    padding: 15,
  },
  iconStyle: {
    position: 'absolute',
    fontSize: 40,
    left: 10,
    top: 5,
  },

  line: {
    width: 50,
    height: 2,
    backgroundColor: '#000',
    borderRadius: 10,
  },

  SignInCont: {
    color: buttonColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },

});

export default index;
