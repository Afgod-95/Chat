import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import OtpInputs from 'react-native-otp-textinput';
import Button from './Button';

const OTPVerification = ({ numberOfInputs = 6, onSubmit, isLoading, otp, setOtp }) => {
  const otpRef = useRef(null);

  const handleOtpChange = (value) => {
    if (setOtp) {
      setOtp(value); 
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(otp); 
    } else {
      console.log(`Submitted OTP: ${otp}`); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter the OTP</Text>
      <OtpInputs
        ref={otpRef}
        handleChange={handleOtpChange}
        numberOfInputs={numberOfInputs}
        inputStyles={styles.otpInput}
      />
      <View style={styles.buttonContainer}>
        <Button
          text="Submit"
          onPress={handleSubmit}
          isLoading={isLoading}
          disabled={otp?.length !== numberOfInputs} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#6200EE',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    width: 50,
    height: 50,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default OTPVerification;
