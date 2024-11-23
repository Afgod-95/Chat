import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, Image } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Channel, MessageInput, MessageList, useChatContext } from 'stream-chat-expo';
import { MaterialIcons } from '@expo/vector-icons'; 
import Feather from '@expo/vector-icons/Feather';
import { formatDate } from '@/constants/DateTimeFormatter';
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from '@stream-io/video-react-native-sdk';



const Messages = () => {
  const [channel, setChannel] = useState(null);
  const [isAttachmentPickerOpen, setIsAttachmentPickerOpen] = useState(false);
  const { cid } = useLocalSearchParams();
  const { client } = useChatContext();

  //creating calls 
  const apiKey = process.env.EXPO_PUBLIC_STREAM_VIDEO_API_KEY;
  const user  = { 
    id: channel?.data?.id,
    name: channel?.data?.name,
    image: channel?.data?.created_by?.image, 
  };
  const token = client.devToken(`${user.id }`);
  const callId = 'my-call-id';

  //initializing video call 
  const handleVideoCall = async () => {
    try{
      if (!channel) return;
      // Pass user, apiKey, token, and callId as query parameters
      router.push({ 
        pathname: `/(video)/${user}`,
        params: { user, apiKey, token, callId }
      });
    }
    catch(error){
      console.error("Error initiating navigating to video call screen:", error);
    }
  }
 

  const inputBoxRef = useRef(null);

  useEffect(() => {
    //fetching clients
    const fetchClients = async () => {
      if (!cid) return;

      try {
        const channels = await client.queryChannels({ cid: cid });
        if (channels.length > 0) {
          setChannel(channels[0]);
        } else {
          console.warn("Channel not found.");
        }
      } catch (error) {
        console.error("Error fetching channel:", error);
      }
    };

    fetchClients();
  }, [cid, client]);

  // Function to close the attachment picker if it's open
  const closeAttachmentPicker = useCallback(() => {
    if (isAttachmentPickerOpen) {
      setIsAttachmentPickerOpen(false);
      console.log("Attachment picker closed.");
    }
  }, [isAttachmentPickerOpen]);

  if (!channel) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
    
      <Stack.Screen 
        name= {null}
        options={{
          headerTitle: '',
          headerLeft: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10}}>
              
              <TouchableOpacity onPress={() => router.back()}>
                <MaterialIcons name="arrow-back" size={24} color="black"  />
              </TouchableOpacity>
              <Image
                source={{ uri: channel?.data?.created_by?.image}} 
                style={{ width: 40, height: 40, borderRadius: 20,}}
              />
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#000' }}>
                  {channel?.data?.created_by?.name}
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 13, color: channel.data.online ? 'green' : 'gray'}}>
                  {channel?.data?.online ? 'Online' : `Last seen: ${formatDate(channel?.data?.created_by?.last_active)}`}
                </Text>
              </View>
              
              
            </View>
            
          ),
          headerRight: () => (
            <View style = {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 18}}>
              <TouchableOpacity onPress={() => alert('Phone clicked!')}
                style = {{ justifyContent: 'center', alignItems: 'center'}}
              >
                <Feather name="phone" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleVideoCall} 
                style = {{ justifyContent: 'center', alignItems: 'center'}}
              >
                <Feather name="video" size={28} color="black" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => alert('Settings clicked!')}
                style = {{ justifyContent: 'center', alignItems: 'center'}}
              >
                <MaterialIcons name="more-vert" size={24} color="black" />
              </TouchableOpacity>
            </View>
            
          ),
      
        }}
      />
      <Channel channel={channel} audioRecordingEnabled asyncMessagesMultiSendEnabled>
        <MessageList />
        <MessageInput
          audioRecordingEnabled={true}
          deletedMessagesVisibilityType={cid}
          inputBoxRef={inputBoxRef}  
          onAttachmentPickerOpen={() => setIsAttachmentPickerOpen(true)}  // Open picker
          onAttachmentPickerClose={closeAttachmentPicker}  
        />
      </Channel>
    </>
  );
};

export default Messages;
