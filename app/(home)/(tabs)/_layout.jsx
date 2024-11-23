
import React from 'react';
import { Slot, Tabs } from 'expo-router';
import ChatProvider from '@/providers/ChatProvider';


const _layout = () => {
  return (

    <ChatProvider>
      <Tabs>
        <Tabs.Screen name='index' />
      </Tabs>
    </ChatProvider>



  )
}

export default _layout