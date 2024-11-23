import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { 
    CallContent,
    CallParticipantsList, 
    RingingCallContent, 
    StreamCall, 
    StreamVideo, 
    StreamVideoClient
} from '@stream-io/video-react-native-sdk';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native';

const VideoCallUI = () => {
    const [joinedCall, setJoinedCall] = useState(false);
    const { apiKey, token, callId, user } = useLocalSearchParams();

    // Ensure the user object has the required fields, especially "id"
    const userObject = {
        id: user?.id || 'default_user_id',  // Provide a default or fallback id if undefined
        name: user?.name || 'Default User',
        image: user?.image || 'https://example.com/default-image.png'
    };

    const client = new StreamVideoClient({ apiKey });

    useEffect(() => {
        const initializeClientAndJoinCall = async () => {
            try {
                // Connect the user to the client
                await client.connectUser(userObject, token);

                const call = client.call('default', callId);

                // Join the call
                await call.join({
                    create: true,
                    ring: true,
                    notify: true,
                });
                setJoinedCall(true);
            } catch (error) {
                console.log(`Failed to join call: ${error.message}`);
            }
        };

        initializeClientAndJoinCall();

        return async () => {
            await client.disconnect();
        };
    }, [userObject, apiKey, callId, token]);

    return (
        <StreamVideo client={client}>
            <StreamCall call={client.call('default', callId)}>
                {joinedCall ? (
                    <>
                        {/* Only use useParticipants inside StreamCall */}
                        <CallParticipantsList />
                        <View style={{ flex: 1 }}>
                            <CallContent />
                        </View>
                    </>
                ) : (
                    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <RingingCallContent />
                    </SafeAreaView>
                )}
            </StreamCall>
        </StreamVideo>
    );
};

export default VideoCallUI;
