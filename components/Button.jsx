import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import React from 'react'
import { buttonC, buttonColor } from '@/constants/Colors';
import Loading from './Loading';

const Button = ({ isLoading, onPress, text }) => {
    const styles = StyleSheet.create({
        button: {
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isLoading ? '#f2f2f2' : buttonColor,
        },
        text: {
            color: '#fff',
        }
    })
    return (
        <TouchableOpacity style={styles.button} onPress={isLoading ? null : onPress} disabled = {isLoading}>
            {isLoading ?
                <Loading isVisible={isLoading} /> : <Text style = {styles.text}>{text}</Text>
            }
        </TouchableOpacity>
    )
}

export default Button