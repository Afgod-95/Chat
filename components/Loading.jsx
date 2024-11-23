import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { buttonColor } from '@/constants/Colors';

const Loading = ({ isVisible }) => {
    const animRef = useRef(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Clean up on unmount or when visibility changes
        if (isVisible) {
            animRef.current?.play();
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            animRef.current?.pause();
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }

        return () => {
            // Cleanup any animation or actions on unmount
            animRef.current?.reset();
        };
    }, [isVisible]);

    return (
        <>

            {/*<Animated.View
                style={[
                    styles.container,
                    { opacity: fadeAnim },
                ]}
            >
                <LottieView
                    autoPlay={false}
                    loop
                    ref={animRef}
                    style={styles.animation}
                    source={require('../assets/images/loadingAnim.json')}
                />
            </Animated.View>*/}
            <View style = {styles.container}>
                <ActivityIndicator
                    size={24}
                    color= { buttonColor }

                />
            </View>
            

        </>

    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: 50,
        height: 50,
    },
});

export default Loading;
