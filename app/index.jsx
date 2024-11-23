import React, { useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import Onboarding from 'react-native-onboarding-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { buttonC, buttonColor } from '@/constants/Colors';
import * as Crypto from 'expo-crypto'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        fontSize: 50,
        textAlign: 'center',
        marginBottom: 20,
    },
    dot: {
        width: 10,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
        backgroundColor: buttonC,
    },
    activeDot: {
        backgroundColor: buttonColor,
        width: 20,
        height: 8,
    },
    button: {
        color: buttonColor,
    },
});

const onboardingData = [
    {
        backgroundColor: '#FFF',
        image: <Text style={styles.icon}>👋</Text>,
        title: 'Welcome to Our App!',
        subtitle: 'Stay connected with your friends through chat and video calls.',
    },
    {
        backgroundColor: '#FFF',
        image: <Text style={styles.icon}>💬</Text>,
        title: 'Chat Anytime',
        subtitle: 'Instant messaging at your fingertips.',
    },
    {
        backgroundColor: '#FFF',
        image: <Text style={styles.icon}>📹</Text>,
        title: 'Make Video Calls',
        subtitle: 'Connect face-to-face from anywhere.',
    },
];

const Dot = ({ selected }) => {
    // Animated style to scale up the dot when selected
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: withSpring(selected ? 1.5 : 1) },
            ],
        };
    });

    return (
        <Animated.View style={[styles.dot, selected && styles.activeDot, animatedStyle]} />
    );
};



const OnboardingScreen = () => {
    
    return (
        <>
            <SafeAreaView style={styles.container}>
                <Onboarding
                    pages={onboardingData}
                    onSkip={() => router.push('/(auth)/')}
                    onDone={() => router.push('/(auth)/')}
                    DotComponent={Dot}
                    showNext={true}

                />
            </SafeAreaView>
        </>
    );
};

export default OnboardingScreen;
 