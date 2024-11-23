import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { ActivityIndicator, View, Text } from 'react-native';
import { OverlayProvider, Chat } from 'stream-chat-expo';

const ChatProvider = ({ children }) => {
    const apiKey = process.env.EXPO_PUBLIC_STREAM_CHAT_API_KEY;

    if (!apiKey) {
        console.error('Missing Stream Chat API key. Set EXPO_PUBLIC_STREAM_CHAT_API_KEY in your environment variables.');
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Error: Missing API Key</Text>
            </View>
        );
    }

    const client = StreamChat.getInstance(apiKey);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const connectAndWatchChannel = async () => {
            try {
                await client.connectUser(
                    {
                        id: 'jlahey',
                        name: 'Jim Lahey',
                        image: 'https://i.imgur.com/fR9Jz14.png',
                    },
                    client.devToken('jlahey')
                );

                const channel = client.channel('messaging', 'the_park', {
                    name: 'The Park',
                });

                await channel.watch();
                setIsConnected(true);
            } catch (error) {
                console.error('Error connecting user:', error);
            }
        };

        connectAndWatchChannel();

        return () => {
            client.disconnectUser();
        };
    }, []);

    if (!isConnected) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <OverlayProvider>
            <Chat client={client}>
                {children}
            </Chat>
        </OverlayProvider>
    );
};

export default ChatProvider;
