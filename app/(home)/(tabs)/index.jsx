import React, { useState } from 'react';
import { router } from 'expo-router';
import {  ChannelList } from 'stream-chat-expo';
import { View, Text } from 'react-native';

const Index = () => {
  return (
    <ChannelList onSelect={(channel) => router.push(`/(home)/(channel)/${channel.cid}`)} />
  );
}

export default Index;
