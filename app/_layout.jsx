import React, { useEffect } from 'react';
import { Slot, router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ChatProvider from '@/providers/ChatProvider';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { setStatusBarStyle } from 'expo-status-bar';

const _layout = () => {
  const tokenCache = {
    async getToken(key) {
      try {
        const item = await SecureStore.getItemAsync(key);
        console.log(`${key} was ${item ? 'retrieved successfully 🔐' : 'not found 🔒'}`);
        return item;
      } catch (error) {
        await SecureStore.deleteItemAsync(key);
        console.error(`Error retrieving ${key}: ${error.message}`);
        return null;
      }
    },

    async setToken(key, token) {
      try {
        await SecureStore.setItemAsync(key, token);
        console.log(`${key} was set successfully 🔓`);
      } catch (error) {
        console.error(`Error storing ${key}: ${error.message}`);
      }
    },
  };

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your environment variables.',
    );
  }

  useEffect(() => {
    setStatusBarStyle('light');
  }, []);

  useEffect(() => {
    console.log('Navigating to /index...');
    router.push('/(auth)/');
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ChatProvider>
        <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
          <ClerkLoaded>
            <Slot />
          </ClerkLoaded>
        </ClerkProvider>
      </ChatProvider>
    </GestureHandlerRootView>
  );
};

export default _layout;
