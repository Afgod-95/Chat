import { View, Text } from 'react-native';
import React, { useState } from 'react';
import OTPVerification from '@/components/OTPVerificationScreen';
import { router, useLocalSearchParams } from 'expo-router';
import { useSignUp } from '@clerk/clerk-expo';
import { isClerkAPIResponseError } from '@clerk/clerk-expo';

const verify = () => {
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); 
  const { phoneNumber } = useLocalSearchParams();

  const { signUp, isLoaded, setActive } = useSignUp();


  const handleVerification = async () => {
    if (!isLoaded || !signUp) return; // Corrected the condition

    setIsLoading(true); // Start loading
    setError(''); // Clear previous errors

    try {
      const signInAttempt = await signUp.attemptPhoneNumberVerification({ code: otp });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        setIsVerified(true);
        router.push('/(home)'); // Redirect after success
      } else {
        console.error(signInAttempt);
        setError('Verification failed. Please try again.');
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        setError(err.errors?.map((e) => e.longMessage).join(', '));
      } 
      else {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <OTPVerification
        otp={otp}
        onSubmit={handleVerification}
        setOtp={setOtp}
        isLoading={isLoading}
      />
      {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
      {isVerified && <Text style={{ color: 'green', marginTop: 10 }}>Verification Successful!</Text>}
    </View>
  );
};

export default verify;
