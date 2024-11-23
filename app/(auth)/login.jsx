import { useSignIn } from '@clerk/clerk-expo';
import { useLocalCredentials } from '@clerk/clerk-expo/local-credentials';
import { router } from 'expo-router';
import { Text, TextInput,  View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { SymbolView } from 'expo-symbols';
import Button from '@/components/Button';

const index = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false)
  const { hasCredentials, setCredentials, authenticate, biometricType } = useLocalCredentials();

  const onSignInPress = React.useCallback(
    async (useLocal = false) => {
      if (!isLoaded) {
        return;
      }
      setIsLoading(true)
      setError(''); 

      try {
        const signInAttempt =
          hasCredentials && useLocal
            ? await authenticate()
            : await signIn.create({
                identifier: phoneNumber,
                password,
              });

        if (signInAttempt.status === 'complete') {
          if (!useLocal) {
            await setCredentials({
              identifier: phoneNumber,
              password,
            });
          }
          await setActive({ session: signInAttempt.createdSessionId });

          // Navigate to home
          router.push('/home');
        } else {
          setError('Sign-in incomplete. Please try again.');
        }
      } catch (err) {
        setError('Sign-in failed. Please check your credentials or try again.');
        console.error('Error during sign-in:', err);
      }
      finally {
        setIsLoading(false)
      }
    },
    [isLoaded, phoneNumber, password, hasCredentials, signIn, authenticate]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)} 
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <Button 
        onPress={onSignInPress}
        text={'Sign In'}
        isLoading={isLoading}
      />
      
      {hasCredentials && biometricType && (
        <TouchableOpacity style={styles.biometricButton} onPress={() => onSignInPress(true)}>
          <SymbolView
            name={biometricType === 'face-recognition' ? 'faceid' : 'touchid'}
            type="monochrome"
          />
          <Text style={styles.biometricText}>
            Sign in with {biometricType === 'face-recognition' ? 'Face ID' : 'Touch ID'}
          </Text>
        </TouchableOpacity>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  biometricButton: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  biometricText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    marginTop: 15,
    color: 'red',
    textAlign: 'center',
  },
});


export default index;